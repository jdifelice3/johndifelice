import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * PdfViewer – inline PDF rendering with optional authenticated fetch.
 *
 * Two ways to provide the PDF:
 *  1) direct src (e.g., "/api/pdf-range/my.pdf") — browser streams it directly via <iframe>/<embed>/<object>
 *  2) fetch mode — we fetch the PDF as a Blob (useful when you need auth headers) and feed an Object URL to the viewer
 *
 * Extras:
 *  - Minimal toolbar (download / open in new tab)
 *  - Graceful loading & error states
 *  - Cleans up Object URLs and aborts fetches on unmount
 */

export type PdfViewerProps = {
  /**
   * Either a full URL (http/https) or a path like "/api/pdf-range/file.pdf".
   * You can also pass just a filename (e.g., "file.pdf") if you supply basePath.
   */
  fileUrl: string;
  /** If provided and `src` is a bare file name, we'll build `${basePath}/${src}`. Defaults to "/api/pdf". */
  basePath?: string;
  /**
   * How to provide the PDF to the viewer.
   * - "direct" (default): viewer element uses `resolvedSrc` directly
   * - "fetch": fetch Blob and use an Object URL (use this when you need headers/credentials)
   */   
  mode?: "direct" | "fetch";
  /** Optional request headers when mode === "fetch" */
  headers?: Record<string, string>;
  /** Optional request credentials when mode === "fetch" */
  credentials?: RequestCredentials;
  /** Choose the underlying element. */
  viewer?: "iframe" | "embed" | "object";
  /** Height of the viewer area */
  height?: string | number;
  /** Optional className for the wrapper */
  className?: string;
  /** Inline styles for the wrapper */
  style?: React.CSSProperties;
  /** Toolbar controls */
  showToolbar?: boolean;
  /** Custom file name used by the Download button */
  downloadName?: string;
  /** Loading and error slots */
  renderLoading?: React.ReactNode;
  renderError?: (err: unknown) => React.ReactNode;
  /** Callbacks */
  onLoad?: () => void;
  onError?: (err: unknown) => void;
  zoom?: number | string; // e.g. 100, 150, 'page-fit'
  visible?: boolean;
};

const isAbsoluteUrl = (u: string) => /^https?:\/\//i.test(u);

export default function PdfViewer({
  fileUrl,
  basePath = "/api/pdf",
  mode = "direct",
  headers,
  credentials,
  viewer = "iframe",
  height = "70vh",
  className,
  style,
  showToolbar = true,
  downloadName,
  renderLoading,
  renderError,
  onLoad,
  onError,
  zoom,
  visible
}: PdfViewerProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<unknown>(null);
  const abortRef = useRef<AbortController | null>(null);

  const src = fileUrl.length > 0 ? fileUrl : 'document.pdf';

  const resolvedSrc = useMemo(() => {
    if (isAbsoluteUrl(src) || src.startsWith("/")) return src;
    return `${basePath.replace(/\/$/, "")}/${encodeURIComponent(src)}`;
  }, [src, basePath]);

  // Fetch as Blob if requested
  useEffect(() => {
    console.log('visible', visible);
    if(visible){
        if (mode !== "fetch") {
        // Cleanup any prior blob URL
        if (blobUrl) URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
        return;
        }

        setLoading(true);
        setErr(null);

        const ac = new AbortController();
        abortRef.current = ac;

        (async () => {
        try {
            const res = await fetch(resolvedSrc, {
            method: "GET",
            headers,
            credentials,
            signal: ac.signal,
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            // Replace any prior URL to avoid leaks
            setBlobUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return url;
            });
            setLoading(false);
        } catch (e) {
            if ((e as any)?.name === "AbortError") return;
            setErr(e);
            setLoading(false);
            onError?.(e);
        }
        })();

        return () => {
        ac.abort();
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedSrc, mode, JSON.stringify(headers || {}), credentials]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      abortRef.current?.abort();
    };
  }, [blobUrl]);

  //const viewerSrc = mode === "fetch" ? blobUrl ?? "" : resolvedSrc;
    const viewerSrc = useMemo(() => {
        let url = mode === "fetch" ? blobUrl ?? "" : resolvedSrc;
        if (zoom && url) {
            url += `#zoom=${zoom}`;
        }
        return url;
    }, [mode, blobUrl, resolvedSrc, zoom]);

  const handleDownload = async () => {
    try {
      if (mode === "fetch" && blobUrl) {
        triggerDownload(blobUrl, downloadName ?? fileNameFromSrc(src));
        return;
      }
      // Direct mode: stream again to ensure Content-Disposition/filename are respected
         const res = await fetch(resolvedSrc, { method: "GET", headers, credentials });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      triggerDownload(url, downloadName ?? fileNameFromSrc(src));
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (e) {
      setErr(e);
      onError?.(e);
    }
  };

  const handleOpenNewTab = () => {
    if (mode === "fetch") {
      if (blobUrl) window.open(blobUrl, "_blank", "noopener,noreferrer");
    } else {
      window.open(resolvedSrc, "_blank", "noopener,noreferrer");
    }
  };

  const content = () => {
    if (loading) return renderLoading ?? <DefaultLoading />;
    if (err) return renderError ? renderError(err) : <DefaultError error={err} />;
    if (!viewerSrc) return renderLoading ?? <DefaultLoading />;

    const commonProps = {
      src: viewerSrc,
      style: { width: "100%", height: normalizeHeight(height), border: "none" as const },
      onLoad: () => onLoad?.(),
    };

    if (viewer === "embed") {
      return <embed {...commonProps} type="application/pdf" />;
    }
    if (viewer === "object") {
      return (
        <object data={viewerSrc} type="application/pdf" style={commonProps.style}>
          <div className="p-4 text-sm">
            Unable to display the PDF inline. <button onClick={handleOpenNewTab} className="underline">Open in new tab</button>.
          </div>
        </object>
      );
    }
    // default: iframe
    return <iframe title="PDF" {...commonProps} />;
  };

  return (
    <div className={"flex flex-col gap-2 " + (className ?? "")} style={style}>
      {showToolbar && (
        <div className="flex items-center gap-2 justify-end">
          <button onClick={handleOpenNewTab} className="px-3 py-1 rounded-xl shadow text-sm">
            Open in new tab
          </button>
          <button onClick={handleDownload} className="px-3 py-1 rounded-xl shadow text-sm">
            Download
          </button>
        </div>
      )}
      <div className="rounded-2xl shadow overflow-hidden bg-white">{content()}</div>
    </div>
  );
}

function DefaultLoading() {
  return (
    <div className="w-full h-[60vh] grid place-items-center text-sm opacity-70">
      Loading PDF…
    </div>
  );
}

function DefaultError({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error ?? "Unknown error");
  return (
    <div className="w-full h-[40vh] grid place-items-center text-sm text-red-600">
      Failed to load PDF: {message}
    </div>
  );
}

function fileNameFromSrc(src: string) {
  try {
    const clean = src.split("?")[0];
    const last = clean.split("/").pop() || "document.pdf";
    return decodeURIComponent(last);
  } catch {
    return "document.pdf";
  }
}

function triggerDownload(url: string, name: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = name.endsWith(".pdf") ? name : `${name}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function normalizeHeight(h: string | number) {
  return typeof h === "number" ? `${h}px` : h;
}

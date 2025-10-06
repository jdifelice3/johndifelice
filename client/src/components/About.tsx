import profilepic from '../../public/profile-pic-india.png';
import dontThink from '../../public/dont-think.jpg';
import burningManuscript from '../../public/burning-ancient-manuscript-stockcake.jpg';
import burningPapersDangers from '../../public/burning-papers-dangers.jpg';

const About = () => {
  return (
      <>
        <h3 style={{textAlign: "center"}}>About</h3>
        <p className='p-center'>
        <img src={profilepic}/>
        </p>
        <p>
        My name is John, and I'm a semi-professional writer of fiction. Semi-professional means that I'm occasionally paid for my writing.
        It means I'm good enough for sporadic publication and a nominal fee, but either not good enough or not ambitious enough to earn a living with it. 
        This site contains many of my published and unpublished works, so have a read and you be the judge.  
        </p>
        <h3>Beginnings</h3>
        <p>
        I started writing fiction when I was 17. I still have the first short story I wrote. How do I describe it? "Bad" comes to mind,
        which is understandable given my life experiences at that age. Coming home from high school and watching <i>Heathcliff</i> and 
        <i>Thunder Cats</i> cartoons is not fertile ground for storytelling.  
        </p>
        <p className='p-center'>
          <img src={dontThink} style={{width: 'auto', height: '200px'}}/>
        </p>
        <p>
        At 23, I attempted to write my first novel. It was about two friends who took an impulse journey from Philadelphia to the 
        Grand Canyon. Told in the first-person perspective, they meet strange characters, places, and situations along the way that 
        beat the reader black and blue with the message that the main character has serious issues and hates his life. Upon reaching their destination, 
        the reader learns that the entire journey was in the main character's head. The main character lay dying on the grounds of his
        elementary school--the last place he was happy--from a self-inflicted gunshot wound. That's right, I was a victim of watching
        <i>The Usual Suspects</i> too many times.
        </p>
        <p>
        I gave my partial, 20,000 word manuscript to an acquantance who was an ameteur novelist. His feedback was mostly snark 
        and derisive humor. He hated it. Because of him, I did not write anything for 7 years.
        </p>
        <p className='p-center'>
          <img src={burningPapersDangers} style={{width: 'auto', height: '175px'}}/>
        </p>
        <h3>What Drama!</h3>
        <p>
        At the age of 30, a barista in the building where I worked asked my girlfriend on a date. He didn't know we were together because
        we were co-workers and were keeping it on the DL. He asked her to join him at a theater
        for a 24-hour theater experience called <i>Fly By Night</i>. She begged me to go with her, which he was not happy about, but it 
        became my first acting experience. I did not feel comfortable acting, and instead became involved in the theater as a writer.
        I had never written for the stage, but within three years, and due largely to the encouragement and constructive feedback from other writer's at the theater,
        I had two full-length plays produced in Philadelphia: <i>Half the Rent</i>, which I'm proud of, and <i>The Department</i>, which
        I wish I had never written. <i>The Department</i> had a much longer run because life is, as you know, cruel.
        </p>
        <h3>Fiction, Revisted</h3>
        <p>
        Taking what I learned from playwrighting--the economy of words, creating tension, keeping exposition to a minimum, and making 
        every character matter--I returned to short story and novel writing. I self-published my first novel, <i>American Zeroes</i>, in 2016.
        I will never self-publish again. I am working to complete my second novel, <i>Traffic Girl Wars</i>, and if it's never published,
        I'm ok with that.
        </p>
      </>
  )
}

export default About;
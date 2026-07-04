export const categoryColors: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  "The Physical World": { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/30', dot: 'bg-sky-400' },
  "Matter & Molecules": { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30', dot: 'bg-purple-400' },
  "Life & Nature": { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', dot: 'bg-emerald-400' },
  "Mathematics": { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', dot: 'bg-amber-400' },
  "Philosophy": { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', dot: 'bg-yellow-400' },
  "Innovation & Technology": { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30', dot: 'bg-cyan-400' },
  "Space & Cosmology": { text: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30', dot: 'bg-indigo-400' },
  "Humanity & Society": { text: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/30', dot: 'bg-rose-400' },
  "Arts & Expression": { text: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10', border: 'border-fuchsia-400/30', dot: 'bg-fuchsia-400' },
};

export const articles = [
  {
    slug: 'how-two-geniuses-invented-calculus',
    substackUrl: 'https://thecollegiumofminds.substack.com/p/how-two-geniuses-invented-calculus',
    title: 'How Two Geniuses Invented Calculus (and then tried to destroy each other)',
    author: 'Mohamed Shahaan',
    category: 'Mathematics',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!8ijr!,w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5520cde8-b325-4795-bde0-44c35e78a082_875x521.png',
    date: 'Jul 04, 2026',
    readTime: '16 min read',
    featured: true,
    excerpt: "This is the story of how ego, nationalism, and derivatives caused the biggest academic meltdown of the 17th century.",
    content: `## 1 | Introduction
Two men invented calculus. The other published it first, while the first did it quietly in his room. Then England declared mathematical war in his honor. This is the story of how ego, nationalism, and derivatives caused the biggest academic meltdown of the 17th century.

## 2 | But first, what the heck even is calculus?
Before we get to the exciting part, let’s respond to the question that is quite evident: what were Newton and Leibniz fighting over?

Calculus is the mathematics of change. It’s the set of tools that allows you to ask and answer two basic questions: How fast is something changing right now? And if something keeps changing, what is the total effect?

The first question is dealt with by derivatives — they quantify changes in instantaneous rates. For example, if you want to figure out how fast a falling apple is accelerating at the exact moment when it leaves the branch, that is a derivative. The second one goes to integrals, which obtain measures of quantities that have been accumulated. If you want to calculate the total distance that an apple has fallen, that is an integral.

Before calculus, math could beautifully deal with static things — geometrical figures, angles, proportions. However, the universe is not static. Planets revolve, objects speed up, populations increase, temperatures change. To accurately describe reality, you need math that can handle motion and change.

This is the reason why calculus was a breakthrough. It gave humans the language with which they could describe a changing world with accuracy. It turned into the basis for physics, engineering, economics, and almost every other discipline that deals with anything that moves, grows, or changes.

So, when each of them claimed to be the sole inventor of this tool that changed the world, things got heated.

## 3 | The Setup
During the 1660s, Isaac Newton was deeply involved in advanced mathematics. The plague and the closing of Cambridge led him to Woolsthorpe Manor where, living almost in total isolation, he formulated the laws of motion, conducted his prism experiments, and — a very important point — invented a whole new branch of mathematics that became the basis of modern science. He referred to it as “the method of fluxions.” However, we know it as calculus.

Nevertheless, Newton did everything in his head-mathematics in notebooks, verified it, came up with problems that no other mathematician would be able to solve, and then didn’t share it with anyone. He barely published, scarcely disputed, and regarded his findings as if they were hazardous antiques — harmful to criticism, and hence, he let them accumulate in his shelf.

On the other hand, the world didn’t benefit from Newton’s brain as he kept most of his discoveries to himself, but the lucky ones who had the chance to peek through his work were left open-mouthed to the extreme; and when he does share it later on, his notation and explanations are incomprehensible, and at the same time, his demeanor is “I have figured out the universe, but you are not deserving of the secrets yet. “

But the point that Newton raised was also considered by another person: in fact, across Europe, Gottfried Wilhelm Leibniz was very outgoing and willing to work with others- he was moving, debating, and interacting with the brilliant minds of that time. By the middle of the 1670s, Leibniz privately developed his calculus, approaching the topic from a geometric and philosophical perspective, and highlighting the differences between Newton’s fluxions and Leibniz’s infinitesimals and sums.

After that, Leibniz thought of something that Newton didn’t: maybe I should publish.

Leibniz publishes differential calculus in 1684 and integral calculus in 1686. His notation: dx, dy, and the integral ∫ are simple, efficient, and appropriate for continuation. He not only comes up with the idea of calculus but also makes it practical.

The European math community being the implication act on it without delay: a tool that is simple and powerful is quickly put to use in physics, astronomy, and engineering. Newton, on the other hand, remains silent, unpublished, and sometimes insinuates that he has solved it a long time ago.

What started as a purely literary, coincidental parallel was to turn into a scientific divide: two geniuses, one problem, and a gap in publication that would change the way we understand math historically

## 4 | The Collision
The two men wrote each other letters in the 1670s, and on the surface, they kept up a facade of mutual respect which was a mixture of genuine interest and strategic maneuvering. Newton, although he was somewhat paranoid about sharing his work, did exchange some correspondence with Leibniz via intermediaries and occasionally directly. In 1676, Newton sent a letter to Leibniz explaining some of his mathematical methods, but as usual, he hid his most important discoveries in coded anagrams and obscure references.

In one of his letters, Newton explained his method but hid the key formula by mixing up his letters: “6accdoe13eff 7i319n4o4qrr4s8t12ux.” Thanks a lot, Isaac. Very clear.

Leibniz, on the other hand, was very warm and positive in his communication and even shared his own thoughts. In a letter, he talked about his methods with absolute intellectual openness and even going so far as to say: “I have also found that a great part of the mysteries of geometry depends upon the consideration of these differences.” He was obviously thrilled to exchange ideas with another mathematician who was addressing similar problems.

The mood was somewhat politeness. Both men were intelligent enough to acknowledge the other’s capabilities, and both were prudent enough not to unleash an outright antagonism. They were trying to “read” each other, trying to figure out what the other knew without giving away too much themselves. It was an intellectual chess game but unfortunately, the moves were 17th-century international mail, which took ages.

For some time, this precarious dance went on smoothly. Leibniz went ahead and published his results. Newton kept doing his work in secret. To mathematicians, the world seemed big enough for both methods to live side by side.

Friends of Newton, however, did not sit idly by. They got embroiled in the affair, and the whole thing went downhill from there.

The trouble was slowly getting ready to blow far off in the late 1690s and did so in the beginning of the 1700s when British mathematicians — loyal to Newton and committed to protecting England’s scientific prestige — started suggesting that Leibniz did not come up with calculus on his own. The allegation was a bomb: that during his visits to London in the 1670s, Leibniz had access to Newton’s uncut ideas and merely wrapped them up in a nicer way to make them look like his own before publishing quickly.

In 1699, a mathematician from Switzerland, Nicolas Fatio de Duillier, a close friend of Newton, published a pamphlet that was a step away from openly accusing Leibniz of plagiarism. He asserted that Newton was “the very first inventor beyond all doubt” and referred to “second inventors” who were taking credit without deserving it. The message was clear, and it went deep and insulting.

Leibniz was very angry. This was not only an academic dispute — it was an attack on his honesty, his reputation, and his life’s work. He replied, denying the charges and affirming that his work was entirely his own. In one of his fiery replies, he wrote: “I have never borrowed from Mr. Newton… I found it all by my own meditations.”

The main point is that word “never.” Leibniz was not only asserting his methods but also his integrity. In the highly status-conscious world of European intelligentsia, being labeled a thief meant professional death.

However, the people supporting Newton did not give up. They brought up the letters as evidence, Leibniz’s trips to England, and timelines which if one looked very closely and with the intention of finding plagiarism, might be able to indicate that Leibniz got his ideas from Newton’s hints. It seemed that the fact that Newton had hidden those ideas in anagrams and that he didn’t want to publish them properly was of no consequence.

Leibniz attempted to remain above the conflict, telling friends that he wished the issue to be resolvable “without bitterness.” In one of his letters, he was at a loss for words because of the accusations:

I am not used to fighting for priority… but when I get attacked, I must defend myself.

He was definitely not going to let this slip. Neither was Newton.

It’s all quite messy from here on out because both of them were probably telling the truth. Independent discovery is a thing. It’s absolutely possible for two people to come to the same solution by different methods, especially if they are both geniuses of the same caliber and are tackling the hottest mathematical problem of that time. However, this was the 17th century, and giving credit to the collaboration was not exactly fashionable. Ego was. Nationalism was. And the idea that maybe, just maybe, two people could invent the same thing without one stealing from the other? Apparently, it was beyond comprehension.

By the time it was the early 1710s, the case, which began with subtle accusations, had turned into a battle on the front lines. Letters that used to be carriers of respectful mathematical discourse were now full of accusations and bitter defenses. The clash between Newton and Leibniz was not only intellectual anymore — it was personal, political, and about to get a lot worse.

The reason is that the Royal Society was going to get involved. And Isaac Newton? He was the one in charge at the Royal Society.

## 5 | The Flame War
By 1712, the dispute had gotten to such a point that the Royal Society of London, the most prestigious scientific institution in Britain, decided to intervene. What this fight needed most was clearly an official, impartial inquiry that would set the record straight on who had invented calculus first.

Awesome idea. Excellent plan.

Just one tiny problem: Isaac Newton was the president of the Royal Society.

Take a moment to think about it. The man at the heart of the controversy, the one who would benefit the most from a favorable outcome, is the one who is in charge of the organization that has to solve the dispute in an unbiased manner. It’s like if a defendant in a trial was also the judge, the jury, and the one who writes the verdict. What could possibly go wrong?

The Royal Society put together a committee to look over the evidence. They collected letters, looked at the manuscripts, interviewed the witnesses, and even checked out the records. Very official. Very thorough. Very legitimate-looking.

And then Newton, in a move that would make even the most shameless reality TV villain blush, wrote the actual report himself. Not “influenced” the report. Not “guided” the committee’s findings. He actually, physically, wrote the paper that was supposed to be an independent investigation of his own priority claim.

The final report, which was published in 1715 under the title Commercium Epistolicum, presented the facts, examined the arguments, and, surprise, surprise, it identified Newton as the genuine, first, and unquestionable inventor of calculus while describing Leibniz as a plagiarist who took ideas and presented them as his own. Really impartial work. Ten out of ten for objectivity. A masterclass in conflict of interest.

The report not only declared Newton the winner; it also greatly insulted Leibniz. It took selective quotations from old letters, created timelines to make Leibniz look like he was up to something, and turned every ambiguous piece of evidence into the least positive interpretation possible. In fact, it was less “rigorous academic investigation” and more “250-page subtweet disguised as scholarship.”

Newton even wrote an anonymous review of his own report for a scientific journal, praising the committee’s findings. As if writing the verdict wasn’t sufficient, he also needed to promote it in the press under a fake name. The man invented calculus and the burner account.

Leibniz, from his place in Germany, was completely baffled by this. He responded with rebuttals, sent angry letters to colleagues, and published his own defenses. However, he was very much on the losing side. The endorsement of the Royal Society was of great importance, and Newton had total control over the narrative in England.

This is when things went totally continental.

England supported Newton with the kind of patriotic enthusiasm that is generally seen after military victories. British mathematicians went on the defensive, declaring Newton the undisputed champion of calculus and considering as treasonous those who suggested otherwise.

Using Leibniz’s notation? Unpatriotic. Suggesting independent discovery? Suspiciously French-sympathizing behavior.

The continent, on the other hand, was not convinced by this farce of a trial. They, on their part, supported Leibniz with the same kind of zeal. Swiss mathematicians, German scholars, French scientists, they all saw Leibniz’s work as innovative, brilliant, and that he was unfairly attacked by English propaganda.

They continued with using his notation, writing papers that deliberately did not follow Newton’s methods, and treating the Royal Society’s report as what it really was: a hit piece.

What started as a quarrel between two mathematicians turned into an international rivalry. British mathematicians used Newton’s clunky dot notation out of sheer national loyalty. European mathematicians used Leibniz’s elegant dx and dy out of equally stubborn spite.

Academic conferences became tense. Publications took sides. You could almost see a mathematical Iron Curtain going down the English Channel.

It was Math Eurovision, except that instead of giving points, everyone was giving grudges. And instead of catchy songs, there were bitter treatises about who understood infinite series better. England: douze points for Newton. Germany: null points for your fraudulent committee. Switzerland: submits an entry entirely in Leibniz notation just to make a point.

The pettiness went through the roof.

British students were taught calculus through Newton’s notation not because it was better, it objectively wasn’t, but because using Leibniz’s methods would be like admitting defeat. On the other hand, European mathematicians treated Newton’s work with cold politeness at best and with rejection at worst.

Now here’s the twist: while England and Europe were embroiled in this mathematical Cold War, the rest of the world was simply doing calculus. Scientists from both sides were solving real problems, making new discoveries, and contributing to human knowledge. However, they were doing it separately, and quite often duplicating the work, because British and Continental mathematicians were not willing to learn from each other.

Due to this stubbornness, British mathematics went into stagnation for almost a century. While European mathematicians like the Bernoullis, Euler, and Lagrange were creating mountains of new mathematics based on Leibniz’s work, British mathematicians were still debating if Newton got enough credit for the ground floor.

It took until the 1820s, more than a hundred years after the controversy began, for British mathematicians to finally, albeit reluctantly, concede that perhaps Leibniz’s notation was worth using. You know, the notation that the whole rest of the mathematical world had been using for years.

## 6 | The Aftermath
Gottfried Wilhelm Leibniz died on November 14, 1716, in Hanover, Germany. He was seventy years old, and despite a lifetime of revolutionary contributions to mathematics, philosophy, logic, and science, his final years were marked by isolation and bitterness.

His funeral was attended by his secretary. That’s it. One person.

No dignitaries showed up. No scientific societies sent representatives. No grand eulogies were delivered. The man who’d invented calculus, proposed binary arithmetic, designed calculating machines, and laid groundwork for modern logic was buried in an unmarked grave like a forgotten clerk. It took weeks before anyone even bothered to mark the spot.

Why? Because half of England — the most powerful scientific establishment in Europe — had spent the last decade broadcasting to anyone who’d listen that Leibniz was a fraud, a plagiarist, and a thief who’d stolen Isaac Newton’s genius and slapped his own name on it. The Royal Society’s official report had done its job. Leibniz’s reputation, at least in the English-speaking world, was utterly destroyed.

He died knowing that in Britain, his name was mud. The country that prided itself on scientific advancement had written him out of the story, reduced his legacy to a footnote, branded him an intellectual criminal. Even people who’d never read a single mathematical paper had heard that Leibniz was the guy who tried to steal credit from the great Isaac Newton.

It was character assassination of the highest order, and it worked.

Newton, by contrast, lived another eleven years, dying in 1727 at the age of eighty-four. He was knighted, celebrated, mourned as a national hero. His funeral was a state affair. He was buried in Westminster Abbey with honors typically reserved for royalty. Poets wrote elegies. The nation mourned. Alexander Pope famously penned: “Nature and Nature’s laws lay hid in night: / God said, Let Newton be! and all was light.”

Newton won the propaganda war so decisively that it took centuries for the full truth to emerge: both men had independently invented calculus, and Leibniz’s version was, in most practical ways, better.

But here’s where British spite transformed from personal vendetta into institutional self-sabotage.

British schools and universities, drunk on nationalist pride and unwilling to give Leibniz even a millimeter of credit, clung to Newton’s notation with the grip of someone holding onto a terrible opinion purely to avoid admitting they were wrong. And Newton’s notation? It was ugly.

Newton used dots over variables to represent derivatives — like ẋ or ẍ — which worked fine for simple cases but became an unreadable mess when dealing with higher-order derivatives or partial differentiation. His approach was built for the specific problems he was solving in physics, not as a general-purpose mathematical language. It was functional if you were Newton, doing Newton-specific things, in Newton’s specific way. For everyone else? A nightmare.

Meanwhile, Leibniz’s notation was a thing of beauty. His dx and dy made the concept of infinitesimal change immediately intuitive. His integral sign ∫ (literally an elongated S for “summation”) visually conveyed what integration did. His notation was flexible, generalizable, and designed for humans who weren’t Isaac Newton to actually use and build upon.

The rest of Europe recognized this immediately and ran with it. Swiss mathematicians, French scholars, German professors — they all adopted Leibniz’s system because it worked. It was elegant. It scaled. It made teaching calculus possible without requiring students to be once-in-a-millennium geniuses.

But Britain? Nope. British mathematics departments spent the entire 18th century teaching Newton’s clunky notation out of sheer, bloody-minded spite. It wasn’t about what worked best. It wasn’t about advancing mathematics. It was about refusing to admit that maybe, just maybe, the guy they’d spent decades dragging through the mud had actually come up with something superior.

The cost was staggering. While Continental mathematicians were developing new branches of analysis, differential equations, and mathematical physics using Leibniz’s notation, British mathematics entered what historians politely call “a period of stagnation.” British students struggled with an inferior system. British researchers found themselves isolated from the cutting-edge work happening in France, Switzerland, and Germany. The nation that had produced Isaac Newton proceeded to waste his legacy by wrapping itself in nationalist pettiness.

It wasn’t until the 1820s — more than a century after the controversy erupted — that British mathematicians finally, reluctantly, humiliatingly admitted defeat and started adopting Leibniz’s notation. By that point, they’d squandered generations of mathematical talent and ceded leadership in the field to Continental Europe.

Today, if you open any calculus textbook anywhere in the world, you’ll see Leibniz’s notation. The dx, the dy, the ∫ sign — that’s all him. We use his language because it doesn’t look like a cursed manuscript written in the margins of a fever dream by someone who assumed everyone reading it would already know what he meant.

Newton’s dot notation survives in a few specialized physics applications, mostly because physicists are stubborn and have their own traditions. But for the vast majority of mathematical work, Leibniz won the long game so decisively that most students don’t even know there was another notation system.

So here’s the brutal irony: Newton got the glory, the knighthood, the Westminster Abbey burial, and the historical reputation as the lone genius who unlocked the universe’s secrets. Leibniz died alone, disgraced, and forgotten by half of Europe.

But every single student who’s ever suffered through a calculus class has cursed derivatives and integrals using Leibniz’s symbols. His notation became the universal language of change itself. And Newton’s? A historical curiosity, abandoned by everyone except the stubborn British institutions that clung to it long past the point of reason.

Leibniz lost the battle. But he absolutely won the war.`,
  },
  {
    slug: 'i-think-therefore-i-end',
    substackUrl: 'https://thecollegiumofminds.substack.com/p/i-think-therefore-i-end',
    title: 'I Think, Therefore I End',
    author: 'Sarvesh Kore',
    category: 'Philosophy',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!cMiK!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7174d7fa-3f2e-43b5-86d1-faf43071b23e_875x492.jpeg',
    date: 'Jul 03, 2025',
    readTime: '3 min read',
    featured: true,
    excerpt: 'A Pattern That Asks Why: A brief philosophical reflection on consciousness, reality, and the inevitability of the end.',
    content: `Reality feels real because it behaves the same way again and again. If its rules kept changing, we would never trust it. But does being consistent mean it is truly real, or just familiar? Maybe reality is only what my mind has learned to accept without questioning.

I experience the world as smooth and continuous, yet science says it is made of tiny pieces. I feel time moving forward, yet physics allows time to slow down, stop, or even lose meaning. So which is real—the world I experience, or the one that exists beyond my senses? If observing something can change it, then am I discovering reality, or helping create it by looking?

I think of myself as an observer, but I am also made of the same matter I observe. There is no clear line between me and the universe. If the universe is a system, I am not outside it—I am a small, temporary pattern within it. Can something inside a system ever fully understand the system itself? Or am I trying to read a book that I am part of?

My thoughts feel personal, like they belong only to me. But they come from brain activity, chemicals, and past experiences I did not choose. If every thought has a cause, where does free choice exist? And if the “self” is something that emerges from matter, does that make it any less real?

Everything that we are doing as biological beings—things that are capable of making and moving and metabolism, holding a “consciousness” and something that is aware of its surroundings—does it even matter? Is “meaning” even relevant without a “consciousness” to experience it? What is the point of living, if the end is inevitable? This “meaning” is just something we as conscious beings have made up.

The end justifies the means…
What is the end? That may remain uncertain to our human minds for a long time. Be it eternal silence, or eternal hell (or some other unknown end?), the end is certain, and my death, inevitable. I might not stay in this “human” form for long, though I will not be gone yet—my particles will not cease to exist. I will simply exist in a higher entropy state—I will be the universe itself (am I not already?).

My particles might have once belonged to some other “individual” once (what is an individual, if everything is part of the same thing?), just as my own particles might make up someone else someday. If that “individual” will be partly made of me, can they really be counted as an “individual”? Is “individuality” even relevant, if anything can make up for anything else? If we are just recycled matter, then our awareness of our own end is the only thing that makes us unique. Didn’t all the particles that make us humans come from earlier generations of stars, long before the Sun? We are essentially stardust.

Maybe reality is not about what exists, but about what can be experienced. And if that is true, then reality does not end when the universe ends—it ends when there is no consciousness left to ask what any of it means.

“The end justifies the means”—does that mean death justifies our consciousness?

Am I thinking because I am destined to die?`,
  },
  {
    slug: 'secrets-of-game-design-part-1',
    substackUrl: 'https://thecollegiumofminds.substack.com/p/the-secrets-of-game-design-part-1',
    title: 'The Secrets of Game Design (Part 1)',
    author: 'Joel Mendonca',
    category: 'Innovation & Technology',
    coverImage: 'https://www.trade.gov.pl/wp-content/uploads/2023/12/gamedev.jpg',
    date: 'July 02, 2026',
    readTime: '4 min read',
    featured: true,
    excerpt: 'This article is part of a series exploring the secrets of game design: the techniques, systems, and psychological tricks that shape how games keep players engaged, motivated, and coming back.',
    content: `Have you ever played a game for 'just 5 minutes' and ended up playing for hours? What makes video games so addictive, regardless of the available features? Today, I'll be sharing the secrets of game design that almost every dev uses to create long lasting and addictive gameplay.

## The Game Loop

Let's start with the simplest yet most effective systems, the gameloop. In simple terms, a gameloop is when players work on a goal, achieve the goal, and get rewarded. In RPG/Adventure based games, the goal is simply provided by the game itself. However, in sandbox games, you, the player, are meant to create your own minigoals and try to achieve them. A good game gives clean instructions or hints on the goal to be achieved, reducing confusion, making players spend hours on that game. After completing the goal, the player must get a reward. This is the most important part, as it decides if the player must spend their time completing the task. Some devs use a technique called "high risk, high reward", which, as the name suggests, makes the goal extremely risky, which upon completion, gives a very big reward. The gameloop must also be simple, and mustn't change drastically throughout gameplay stages. An example of this is Geometry Dash. In this game, regardless of your skill level, the main gameloop is to jump and avoid hitting obstacles. The loop is very easy to understand, but hard to master, making this a perfect example for a gameloop.

## Progression Systems

However, a good gameplay loop alone is not enough to keep players engaged for months or even years. This leads us to our second technique in game design, the progression system. This simple, yet powerful system is the key factor to any game's success. The way this works is as follows. Every player starts at the lowest level or status. Gradually, after unlocking certain objectives or completing certain tasks, the player's level/status must evolve based on their skill. Simple, right? However, the main thing that separates a bad progression system from an addictive one is the way dev's implement it. Let's talk about flow state for a second, as it's an important factor for a good progression system. Flow state is a mental state where a person's mind enters a deep focus mode. In order to achieve this, the person must balance the task difficulty. Making the task too easy results in boredom, and making it too hard results in frustration. A good game developer needs to learn how to balance the person's mood based on their level/status in the game. For dev's that are just starting on video game design, a good way to test it is to create a prototype as fast as possible, and send it to different people without any guidance. Then, watch how the players react to different mechanics, and note down which ones they like, which ones they don't, and which ones they get obsessed with. This only comes through years of experience, so don't feel discouraged if someone doesn't like your game idea.

## Finding Game Ideas

These above tips, however, only work when you have a clear game idea. If you're struggling to find good ideas for your game, the below tips will help. First, start brainstorming on your favorite game genre. My personal favorite is the sandbox genre. After that, do some research on the popularity of the genre. You may open steam or itch.io, and search up the genre. After this, try to mix different genres to create your game idea. For example, let's say you love horror games, but the current trend is sandbox. In that case, you can create an Open-World Horror RPG where a player is stuck in a liminal space and their goal is to create solutions on how to escape. The idea for my long-term project, Build, came when I first stumbled upon cookie clicker, and thought if I could merge an idle-based game with my favorite genre at the time, sandbox. Another thing that beginners tend to do is to overscope their idea. You must never overscope your game idea. Always start small, get immediate player feedback, and gradually add features.

## Conclusion

Game designing can never be taught by anyone. It comes from years of experience. I hope the above game designing techniques gave you all a good starting point and maybe inspired you to create your own games. Good luck on your gamedev journey!!`,
  },
  {
    slug: 'is-our-universe-a-hologram',
    title: 'Is Our Universe A Hologram?',
    author: 'CoM Members',
    category: 'Space & Cosmology',
    coverImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80',
    date: 'Nov 13, 2025',
    readTime: '5 min read',
    excerpt: 'A concise exploration of how modern physics hints that the universe might be encoded on a cosmic 2D surface.',
    content: `The holographic principle suggests the universe could be encoded like a hologram — a 3D reality from 2D information.

This article is coming soon. Stay tuned for the full deep dive into the holographic principle and what it means for our understanding of reality.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-law-that-builds-the-universe-entropy',
    title: 'The Law That Builds The Universe: Entropy',
    author: 'CoM Members',
    category: 'Matter & Molecules',
    coverImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    date: 'Nov 23, 2025',
    readTime: '17 min read',
    excerpt: "An exploration of how a single physical principle drives the Universe's evolution, shaping time, complexity, and every process that unfolds around us.",
    content: `Discussing how entropy and early structure formation define time's arrow and the universe's evolution.

This article is coming soon. Stay tuned for the full exploration of entropy and its role in building the universe.

*Authored by: CoM Members*`,
  },
  {
    slug: 'is-our-universe-really-an-isolated-system',
    title: 'Is Our Universe Really An Isolated System?',
    author: 'CoM Members',
    category: 'Space & Cosmology',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
    date: 'Dec 29, 2025',
    readTime: '8 min read',
    excerpt: 'Is the universe truly isolated, or does the breakdown of global energy conservation challenge this assumption?',
    content: `Explores whether treating the cosmos as an isolated system holds when energy conservation isn't global.

This article is coming soon. Stay tuned for the full exploration of whether our universe is truly an isolated system.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-secret-code-of-plants-fibonacci-in-nature',
    title: 'The Secret Code of Plants: Fibonacci in Nature',
    author: 'CoM Members',
    category: 'Life & Nature',
    coverImage: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    date: 'Jan 10, 2026',
    readTime: '6 min read',
    excerpt: 'How spirals, leaf arrangements, and sunflower seeds reveal deep mathematical codes embedded in life.',
    content: `## The Secret Code of Plants: Fibonacci in Nature

Have you ever looked closely at a sunflower or a pinecone? If you count the spirals winding in clockwise and counterclockwise directions, you will almost always find consecutive numbers from the famous Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...).

This is not a coincidence; it is an optimized pattern of growth designed by evolution to maximize space and exposure to sunlight.

This article is coming soon. Stay tuned for a deep scientific exploration of phyllotaxis and the mathematical beauty of the natural world.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-infinities-beyond-infinity',
    title: 'The Infinities Beyond Infinity',
    author: 'CoM Members',
    category: 'Mathematics',
    coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    date: 'Jan 22, 2026',
    readTime: '9 min read',
    excerpt: "An intuitive journey into Cantor's set theory, showing how some infinities are literally larger than others.",
    content: `## The Infinities Beyond Infinity

In school, we are taught that infinity is a single concept — a destination we can never reach. However, in the late 19th century, mathematician Georg Cantor shocked the academic world by proving that there are different "sizes" of infinity.

The infinity of real numbers (decimals) is strictly larger than the infinity of natural numbers (counting numbers).

This article is coming soon. Stay tuned for an elegant journey through Cantor's diagonal argument and the mind-bending world of transfinite math.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-limits-of-human-perception',
    title: 'The Limits of Human Perception',
    author: 'CoM Members',
    category: 'Philosophy',
    coverImage: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
    date: 'Feb 05, 2026',
    readTime: '7 min read',
    excerpt: 'Do we see reality as it truly is, or is our brain merely decoding a simplified user interface?',
    content: `## The Limits of Human Perception

We trust our eyes, our ears, and our touch to tell us what is real. But cognitive science and philosophy suggest our sensory experience is heavily filtered.

Our brains do not construct an objective 3D model of the universe; instead, they render a highly simplified, evolutionarily beneficial "desktop interface" of reality.

This article is coming soon. Stay tuned for a philosophical and cognitive examination of how we perceive the universe, and what lies beyond our senses.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-evolution-of-global-networks',
    title: 'The Evolution of Global Networks',
    author: 'CoM Members',
    category: 'Humanity & Society',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    date: 'Feb 18, 2026',
    readTime: '8 min read',
    excerpt: 'How hyper-connectivity shapes collective consciousness, empathy, and modern social structures.',
    content: `## The Evolution of Global Networks

For the first time in human history, billions of brains are wired together in a near-instantaneous global feedback loop. This network is not just a tool; it is a brand-new medium for human evolution, culture, and collective intelligence.

This article is coming soon. Stay tuned for a sociological and historical analysis of how digital networks are restructuring our communities, our relationships, and our minds.

*Authored by: CoM Members*`,
  },
  {
    slug: 'the-geometry-of-harmony-in-music',
    title: 'The Geometry of Harmony in Music',
    author: 'CoM Members',
    category: 'Arts & Expression',
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80',
    date: 'Mar 02, 2026',
    readTime: '8 min read',
    excerpt: 'Exploring the mathematical symmetries and geometrical relationships behind musical chords and artistic masterpieces.',
    content: `## The Geometry of Harmony in Music

Music feels like pure emotion, but beneath the surface lies a rigid mathematical skeleton. From the Pythagorean tuning systems to the modern circle of fifths, the relationship between musical notes can be represented as high-dimensional geometric shapes.

This article is coming soon. Stay tuned for a captivating crossover of physics, mathematics, and musical composition, showing how geometry creates harmony.

*Authored by: CoM Members*`,
  }
];


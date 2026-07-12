/* src/data/blogs.js */

export const blogs = [
  {
    slug: 'premium-visual-interfaces',
    title: 'Building Premium Visual Interfaces: A Minimalist Approach',
    description: 'Explore the principles of creating high-quality, modern user interfaces that look professional, clean, and align with premium design aesthetics like Apple and Vercel.',
    featuredImage: '/blog_react.png',
    readingTime: '5 min read',
    date: 'July 12, 2026',
    content: [
      {
        type: 'paragraph',
        text: 'In the modern web ecosystem, first impressions are critical. A premium visual layout doesn\'t rely on flashing animations or high-contrast neon highlights. Instead, it relies on whitespace, cohesive typography, robust spacing systems, and harmonious color choices. By utilizing structural grids and solid cards instead of heavy glassmorphism, developers can achieve clean visual hierarchies that guide user focus effectively.'
      },
      {
        type: 'heading',
        text: 'The Importance of Spacing and Typographic Scale'
      },
      {
        type: 'paragraph',
        text: 'Visual elements require breathing room. Proper section margins (ranging from 100px to 140px) allow content to feel distinct and readable. Combined with clean typography like the Inter font, headings stand out, body content is highly legible, and visual clutter is eliminated. Justifying text blocks on large paragraphs can also enhance layout stability and give projects a polished book-like look.'
      },
      {
        type: 'code',
        code: `/* CSS spacing variables example */
:root {
  --spacing-section: 130px;
  --font-sans: 'Inter', sans-serif;
  --text-line-height: 1.7;
}`,
        language: 'css'
      },
      {
        type: 'heading',
        text: 'Designing Cohesive Hover Interaction States'
      },
      {
        type: 'paragraph',
        text: 'Interactive elements like buttons and cards must feel responsive and alive. Smooth 250ms transitions on state changes (such as slight visual lifts or soft box-shadows) offer users clear confirmation of their mouse location. These micro-interactions build a sense of tactile premium quality and increase general user engagement.'
      }
    ]
  },
  {
    slug: 'qa-internship-experience',
    title: 'Quality Assurance 101: My Internship Experience at Kalesh',
    description: 'A deep-dive into manual testing, functional and regression test suites, bug tracking systems, and collaboration techniques gathered during my QA internship.',
    featuredImage: '/blog_testing.png',
    readingTime: '7 min read',
    date: 'June 28, 2026',
    content: [
      {
        type: 'paragraph',
        text: 'Ensuring that software behaves correctly across devices and environments is a core tenet of web quality. During my QA tester internship at Kalesh, I gained hands-on experience executing functional, compatibility, and regression test suites. Testing isn\'t just about clicking buttons; it requires analytical thinking, comprehensive test plans, and meticulous bug reporting documentation.'
      },
      {
        type: 'heading',
        text: 'Writing Bulletproof Bug Reports'
      },
      {
        type: 'paragraph',
        text: 'A good bug report bridges the communication gap between QA testers and development teams. It should contain a clear summary, detailed steps to reproduce, expected vs actual behaviors, environments tested, and console logs. Clear bug reports allow developers to debug and fix defects quickly, speeding up the release cycle and maintaining high quality bars.'
      },
      {
        type: 'code',
        code: `## Bug Report: Notes Not Saving on Reload
### Steps to Reproduce:
1. Navigate to the Note-taking section.
2. Enter text in the note field and press 'Save'.
3. Reload the browser page.

### Expected Behavior:
Note content persists after page refresh.

### Actual Behavior:
Note content disappears (localStorage values are empty).`,
        language: 'markdown'
      },
      {
        type: 'heading',
        text: 'Continuous Verification Processes'
      },
      {
        type: 'paragraph',
        text: 'Implementing manual smoke tests before new deployments helps isolate regressions early in the lifecycle. By keeping structured verification checklists and combining manual testing with automated test runs, organizations can confidently ship clean, bug-free, and high-performance interfaces to production.'
      }
    ]
  },
  {
    slug: 'developer-productivity',
    title: 'Maximizing Developer Productivity in 2026',
    description: 'Insights into designing optimal developer environments, utilizing keyboard-driven navigation, command palettes, and setting up clean workspaces.',
    featuredImage: '/blog_productivity.png',
    readingTime: '6 min read',
    date: 'May 10, 2026',
    content: [
      {
        type: 'paragraph',
        text: 'Developer productivity is less about typing speed and more about reducing context-switching. A key element of high-speed developer workflows is minimizing reliance on the mouse. Tools like Command Palettes allow developers to execute commands, trigger actions, and navigate files rapidly using only their keyboards.'
      },
      {
        type: 'heading',
        text: 'Implementing Command Palettes in Web Interfaces'
      },
      {
        type: 'paragraph',
        text: 'Integrating a keyboard-triggered overlay (e.g. Ctrl + K) on websites provides power-users with shortcuts for page traversal, theme preferences, and clipboard copies. This design makes the portfolio feel like a modern application and adds an additional tier of premium interaction detail.'
      },
      {
        type: 'code',
        code: `// Simple keyboard event listener in React
useEffect(() => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);`,
        language: 'javascript'
      },
      {
        type: 'heading',
        text: 'Clean Workspaces and Mental Focus'
      },
      {
        type: 'paragraph',
        text: 'A clean screen reflects a clean mind. Hiding unnecessary visual clutter (like flashy grid background animations or distracting custom cursors) makes interfaces feel premium and allows developers to focus on what matters: reading source code and building clean software.'
      }
    ]
  }
];

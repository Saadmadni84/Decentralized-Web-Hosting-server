# The Intelligent Host

**The Intelligent Host** is a decentralized, AI-powered web hosting platform designed to provide censorship-resistant, optimized content delivery. It leverages decentralized storage technologies like IPFS/Arweave and AI-driven routing to ensure your content is always available and delivered with lightning speed.

## Features

*   **Decentralized Hosting:** Content is stored on decentralized networks (IPFS/Arweave), ensuring permanence and resistance to censorship.
*   **AI-Powered dCDN:** Smart routing and caching mechanisms optimized by AI for global, low-latency content delivery.
*   **DAO Governance:** Community-driven content moderation where the community decides on content policies.
*   **Name Resolution:** Resolve decentralized names to view hosted content easily.
*   **Modern UI:** Built with a sleek, responsive interface using Tailwind CSS and Framer Motion.

## Tech Stack

*   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
*   **Library:** [React 18](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd the-intelligent-host
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                # Next.js App Router pages and layouts
│   ├── dao/            # DAO Governance page
│   ├── dashboard/      # User dashboard
│   ├── network/        # Network status/map
│   ├── report/         # Reporting interface
│   ├── upload/         # Content upload page
│   ├── view/           # Content viewer (dynamic routes)
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Landing page
├── components/         # Reusable UI components
│   ├── ui/             # Basic UI elements (buttons, inputs, etc.)
│   └── ...             # Feature-specific components (Navbar, Footer, etc.)
├── lib/                # Utility functions and API helpers
└── public/             # Static assets
```

## Scripts

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs the linter to check for code issues.

## License

[MIT](LICENSE)

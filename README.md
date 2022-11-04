<h1><img src="docs/logo.svg" width="220" style="height: 63px;"></h1>

A website displaying grade statistics for all courses at the Norwegian University of Science and Technology (NTNU) since 2004. Courses can be found by searching for their course code and name, or using the list of the most viewed courses for the past seven days on the front page. Each course has its own dashboard page, showing the grades for each semester in a bar chart, average grade and fail percentage for each semester in line charts, and total average grade and total fail percentage for all semesters. Semesters can be filtered by autumn and/or spring.

<br/>
<p align="center">
	<img src="docs/course-page.png" width="830"/>
</p>

## Developer Guide

This is a [Next.js 12](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), using [`styled-components`]() for styling and [`Prisma`]() for database access.

### Prerequisites

The following is needed to run the project locally:

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/)
-   [MySQL]() database

### Installation and Usage

Install dependencies:

```bash
yarn install
```

Run the project in development mode:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

API routes can be accessed on [http://localhost:3000/api](http://localhost:3000/api/).

#### Database Changes

If changes are made to the database, the Prisma schema must be updated and the client must be regenerated:

1. Update schema: `prisma db pull`
2. Update client: `prisma generate`

### Build Project

To build the project for production, run:

```bash
yarn build
```

This generates a new folder `.next/standalone` that includes a standalone production build, which can be deployed without installing dependencies. The `public` and `.next/static` folders must be manually copied into `.next/standalone/public` and `.next/standalone/.next/static`. Refer to [Next.js docs](https://nextjs.org/docs/advanced-features/output-file-tracing) for more information.

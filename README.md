This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Install dependencies:
yarn install --ignore-engines 

## Getting Started

- First, go to move directory and create an aptos account:
```
cd move
aptos int --profile=<Profile name>
```
- Copy the value of "account" in `.aptos/config.yaml` file under `profiles` then <Profile name>, in `Move.toml` file under `[addresses]` like this:
```
[addresses]
<Profile name> = <value in account>
```

- Copy the <Profile name> to `sources/counter.move` to the following:
```
module <Profile name>::MyCounter {
```


- To compile 
```
aptos move compile
```

- After the compilation you would get the contract address in Result. In the `frontend` folder create an copy of `env.example` file called `.env` file and set the value of `NEXT_PUBLIC_CONTRACT_ADDRESS` account with, contract address with `0x` prefix.

- Deploy the contract:
```
aptos move publish --profile=<Profile name>
```




- In the `.aptos` folder `config.yaml` file get the private key and import the private key in your browser wallet (Like Petra wallet)

- Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

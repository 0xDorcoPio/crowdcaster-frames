import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frames Next.js Example",
    other: {
      ...(await fetchMetadata(
        new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/frames` : "http://localhost:3000")
      )),
    },
  };
}

export default async function Home() {
  return <div>GM user data example.</div>;
}

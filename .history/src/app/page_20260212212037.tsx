import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div >
      <h1 className="text-4xl font-bold text-center mt-10">
        Welcome to EstateBridge
      </h1>
      <p className="text-center mt-4 text-lg">
        Your one-stop solution for real estate management and transactions.
      </p>
      <Button variant="default" className="mx-auto block mt-6">Get Started</Button>
    </div>
  );
}

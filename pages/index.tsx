import Head from "next/head";
import CoffeePriceCalculator from "../components/CoffeePriceCalculator";

export default function Home() {
  return (
    <>
      <Head>
        <title>커피 가격 계산기</title>
      </Head>
      <CoffeePriceCalculator />
    </>
  );
}

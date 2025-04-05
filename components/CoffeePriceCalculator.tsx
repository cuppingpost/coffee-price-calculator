import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const calculatePrices = (coffeeDataList) => {
  return coffeeDataList.map((data) => {
    const { cost, stock, usage, volume, quality } = data;
    const unitCount = 840 / volume;

    let basePrice = 0;
    if (usage === "원두") {
      basePrice = (cost * 2.2) / unitCount;
    } else if (usage === "생두") {
      basePrice = cost * 1.25;
    } else if (usage === "잔") {
      basePrice = (cost * 4) / unitCount;
    }

    let stockMultiplier = 1.0;
    if (stock <= 50) stockMultiplier = 1.10;
    else if (stock <= 100) stockMultiplier = 1.05;

    let qualityMultiplier = 1.0;
    if (quality === 5) qualityMultiplier = 1.15;
    else if (quality === 4) qualityMultiplier = 1.10;
    else if (quality === 3) qualityMultiplier = 1.05;

    const recommendedPrice = basePrice * stockMultiplier * qualityMultiplier;

    return {
      usage,
      basePrice: basePrice.toFixed(2),
      recommendedPrice: recommendedPrice.toFixed(2),
    };
  });
};

const CoffeePriceCalculator = () => {
  const [inputs, setInputs] = useState([
    { cost: "", stock: "", usage: "원두", volume: "", quality: "" },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([
        ...inputs,
        { cost: "", stock: "", usage: "원두", volume: "", quality: "" },
      ]);
    }
  };

  const handleCalculate = () => {
    const formatted = inputs.map((input) => ({
      cost: parseFloat(input.cost),
      stock: parseInt(input.stock),
      usage: input.usage,
      volume: parseFloat(input.volume),
      quality: parseInt(input.quality),
    }));
    setResults(calculatePrices(formatted));
  };

  return (
    <div className="min-h-screen bg-black text-brown-200 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-brown-300">커피 가격 계산기</h1>
      {inputs.map((input, index) => (
        <Card key={index} className="bg-[#1a1a1a] text-brown-100 p-4">
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Input
              placeholder="1kg 원가"
              value={input.cost}
              onChange={(e) => handleChange(index, "cost", e.target.value)}
              type="number"
              className="bg-black text-brown-100 border-brown-300"
            />
            <Input
              placeholder="재고량"
              value={input.stock}
              onChange={(e) => handleChange(index, "stock", e.target.value)}
              type="number"
              className="bg-black text-brown-100 border-brown-300"
            />
            <select
              value={input.usage}
              onChange={(e) => handleChange(index, "usage", e.target.value)}
              className="bg-black text-brown-100 border border-brown-300 rounded p-2"
            >
              <option value="원두">원두</option>
              <option value="생두">생두</option>
              <option value="잔">잔</option>
            </select>
            <Input
              placeholder="용량 (ml)"
              value={input.volume}
              onChange={(e) => handleChange(index, "volume", e.target.value)}
              type="number"
              className="bg-black text-brown-100 border-brown-300"
            />
            <Input
              placeholder="퀄리티 (1~5)"
              value={input.quality}
              onChange={(e) => handleChange(index, "quality", e.target.value)}
              type="number"
              className="bg-black text-brown-100 border-brown-300"
            />
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-4 justify-center">
        <Button
          onClick={handleAddInput}
          disabled={inputs.length >= 5}
          className="bg-brown-700 text-white"
        >
          항목 추가
        </Button>
        <Button onClick={handleCalculate} className="bg-brown-500 text-white">
          계산하기
        </Button>
      </div>
      {results.length > 0 && (
        <div className="mt-6 space-y-3">
          <h2 className="text-2xl font-semibold text-center text-brown-300">계산 결과</h2>
          {results.map((res, idx) => (
            <div
              key={idx}
              className="bg-[#1e1e1e] text-brown-200 border border-brown-400 p-4 rounded"
            >
              <p>용도: {res.usage}</p>
              <p>기본 가격: {res.basePrice}원</p>
              <p>추천 가격: {res.recommendedPrice}원</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoffeePriceCalculator;

import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import React from "react";
import App from "./App";

const renderApp = () => render(<App />);
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  })
);

afterEach(() => {
  fetchMock.restore();
  cleanup();
});

test("Test getting pokemon details", async () => {
  let data = {
    data: {
      id: 1,
      num: "001",
      name: "Bulbasaur",
      type: ["Grass", "Poison"],
      height: "0.71 m",
      weight: "6.9 kg",
      candy: "Bulbasaur Candy",
      candy_count: 25,
      egg: "2 km",
      spawn_chance: 0.69,
      avg_spawns: 69,
      spawn_time: "20:00",
      multipliers: [1.58],
      weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
      next_evolution: [
        { num: "002", name: "Ivysaur" },
        { num: "003", name: "Venusaur" },
      ],
    },
  };
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=1", JSON.stringify(data));

  const { getByTestId, queryByTestId } = renderApp();

  fireEvent.change(getByTestId("id-input"), { target: { value: "1" } });

  fireEvent.click(getByTestId("random-pokemon"));
  expect(getByTestId("id-input")).toBeInTheDocument();
  await waitFor(() => {
    expect(queryByTestId("pokemon-id")).toBeInTheDocument();
    expect(queryByTestId("pokemon-name")).toBeInTheDocument();
    expect(queryByTestId("pokemon-name")).toHaveTextContent("Bulbasaur");
  });
});

test("Test getting next evolution", async () => {
  let data = {
    data: {
      id: 1,
      num: "001",
      name: "Bulbasaur",
      type: ["Grass", "Poison"],
      height: "0.71 m",
      weight: "6.9 kg",
      candy: "Bulbasaur Candy",
      candy_count: 25,
      egg: "2 km",
      spawn_chance: 0.69,
      avg_spawns: 69,
      spawn_time: "20:00",
      multipliers: [1.58],
      weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
      next_evolution: [
        { num: "002", name: "Ivysaur" },
        { num: "003", name: "Venusaur" },
      ],
    },
  };
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=1", JSON.stringify(data));
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=001", JSON.stringify(data));

  let data1 = {
    data: {
      id: 2,
      num: "002",
      name: "Ivysaur",
      type: ["Grass", "Poison"],
      height: "0.99 m",
      weight: "13.0 kg",
      candy: "Bulbasaur Candy",
      candy_count: 100,
      egg: "Not in Eggs",
      spawn_chance: 0.042,
      avg_spawns: 4.2,
      spawn_time: "07:00",
      multipliers: [1.2, 1.6],
      weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
      prev_evolution: [{ num: "001", name: "Bulbasaur" }],
      next_evolution: [{ num: "003", name: "Venusaur" }],
    },
  };
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=002", JSON.stringify(data1));
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=2", JSON.stringify(data1));

  let data2 = {
    data: {
      id: 3,
      num: "003",
      name: "Venusaur",
      type: ["Grass", "Poison"],
      height: "2.01 m",
      weight: "100.0 kg",
      candy: "Bulbasaur Candy",
      egg: "Not in Eggs",
      spawn_chance: 0.017,
      avg_spawns: 1.7,
      spawn_time: "11:30",
      multipliers: null,
      weaknesses: ["Fire", "Ice", "Flying", "Psychic"],
      prev_evolution: [
        { num: "001", name: "Bulbasaur" },
        { num: "002", name: "Ivysaur" },
      ],
    },
  };
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=003", JSON.stringify(data2));
  fetchMock.get("https://jsonmock.hackerrank.com/api/pokemon?id=3", JSON.stringify(data2));

  const { getByTestId, queryByTestId } = renderApp();

  fireEvent.change(getByTestId("id-input"), { target: { value: "1" } });
  fireEvent.click(getByTestId("random-pokemon"));
  await waitFor(() => {
    expect(getByTestId("pokemon-prev")).toBeDisabled();
    expect(queryByTestId("pokemon-next")).not.toBeDisabled();
  });
  await waitFor(() => {
    fireEvent.click(getByTestId("pokemon-next"));
    expect(queryByTestId("pokemon-name")).toHaveTextContent("Ivysaur");
    console.log(queryByTestId("pokemon-name").textContent);
  });
  await waitFor(() => {
    fireEvent.click(getByTestId("pokemon-prev"));
    expect(queryByTestId("pokemon-name")).toHaveTextContent("Bulbasaur");
  });
});

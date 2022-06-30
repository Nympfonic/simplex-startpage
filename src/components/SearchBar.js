import React, { useState } from "react";

export default function SearchBar() {
  // Variable assigned to use the useState() hook
  const [searchInput, setSearchInput] = useState("");

  // Array storing different command objects
  const validInputs = [
    { command: "/", action: () => console.warn("Invalid command.") },
    { command: "/ping", action: () => alert("Pong") },
    { command: "/s", action: () => searchAction() }
  ];

  // -- Handler function --
  // Reads changes in the search bar
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // -- Handler function --
  // Handles key press
  const handleKeyPress = (e) => {
    if (searchInput.length > 0 &&
      e.key === "Enter") {
      if (searchInput.startsWith('/')) {
        runCommand();
      } else if (isValidUrl(searchInput)) {
        var link = searchInput;
        if (!searchInput.startsWith("http"))
          link = "https://" + searchInput;
        window.open(link, "_self");
      }
    }
  };

  const runCommand = () => {
    const si = searchInput.split(" ");
    var cmd = validInputs.filter((input) => {
      return input.command.match(si[0]);
    });
    if (cmd.length > 0) {
      cmd[0].action();
    }
  };

  const searchAction = () => {
    if (searchInput.length > 3) {
      const query = searchInput.slice(3, searchInput.length);
      searchEngineQuery(query);
    }
  };

  const searchEngineQuery = (input) => {
    const baseUrl = "https://duckduckgo.com/?t=vivaldi&q=";
    const completeUrl = baseUrl + encodeURIComponent(input);
    window.open(completeUrl, "_self");
  };

  const isValidUrl = (value) => {
    const exp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    const regexp = new RegExp(exp);
    return regexp.test(value);
  };

  return (
    <section id="searchbar" className="searchbar">
      <input
        type="text"
        placeholder=""
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        value={searchInput}
        id="searchbar-input" />
    </section>
  );
}
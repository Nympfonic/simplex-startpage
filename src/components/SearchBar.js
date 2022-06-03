import React, { useState } from "react";

export default function SearchBar() {
  // Variable assigned to use the useState() hook
  const [searchInput, setSearchInput] = useState("");

  // Array storing different command objects
  const validInputs = [
    { command: "/", action: () => console.warn("Invalid command.") },
    { command: "/ping", action: () => alert("Pong") },
    { command: "/s", action: () => {
      if (searchInput.length > 3) {
        const url = searchInput.trim().slice(2, searchInput.length - 1);
        if (isValidUrl(url))
          searchEngineQuery(url);
        else console.warn("Invalid URL.");
      }}}
  ];

  // -- Handler function --
  // Reads changes in the search bar
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // -- Handler function --
  // Handles Enter key press
  const handleEnter = (e) => {
    if (searchInput.length > 0 &&
      e.key === "Enter") {
      if (searchInput.startsWith('/')) {
        runCommand();
      } else if (isValidUrl(searchInput)) {
        var link = searchInput;
        if (!searchInput.startsWith("http"))
          link = "https://" + searchInput;
        window.open(link);
      }
    }
  };

  const searchEngineQuery = (input) => {
    var baseUrl = "https://duckduckgo.com/?t=vivaldi&q=";
    var completeUrl = baseUrl + encodeURIComponent(input);
    window.open(completeUrl);
  }

  const runCommand = () => {
    var cmd = validInputs.filter((input) => {
      const regex = new RegExp("^" + searchInput + "$");
      return input.command.match(regex);
    });
    if (cmd.length > 0) {
      cmd[0].action();
    }
  }

  const isValidUrl = (value) => {
    var exp = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
    var regexp = new RegExp(exp);
    return regexp.test(value);
  }

  return (
    <section id="searchbar" className="searchbar">
      <input
        type="text"
        placeholder=""
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={searchInput}
        id="searchbar-input" />
    </section>
  );
}
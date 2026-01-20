"use client";
import { useState, useEffect } from "react";

interface Meaning {
  partOfSpeech: string;
  synonyms?: string[];
  definitions: {
    definition: string;
    example?: string;
  }[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [definition, setDefinition] = useState<any>(null);
  const [phonetic, setPhonetic] = useState<any>(null);
  const [error, setError] = useState("");
  const [help, setHelp] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const word = params.get("word");
      if (word) {
        setQuery(word);
        handleSearch(undefined, word);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSearch = async (e?: React.FormEvent, synonym?: string) => {
    if (e) e.preventDefault();

    const wordToSearch = synonym || query.trim();
    if (!wordToSearch) {
      setHelp("Whoops, can't be empty...");
      return;
    }

    setHelp("");
    setError("");
    setDefinition(null);

    try {
      const response = await fetch(`/api/define?word=${wordToSearch}`);
      window.history.pushState({}, "", `?word=${wordToSearch}`);
      if (!response.ok) throw new Error("No Definitions Found");
      const data = await response.json();
      console.log(data);
      setDefinition(data[0]);
      setPhonetic(data[0].phonetics.find((phonetic: any) => phonetic.audio));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const playAudio = () => {
    if (phonetic?.audio) {
      const audio = new Audio(phonetic.audio);
      audio.play();
    }
  };

  return (
    <main className="my-10 h-full">
      <form
        onSubmit={handleSearch}
        className={
          help
            ? "w-full flex bg-gray-200 dark:bg-gray-900 rounded-xl p-2 border border-red-500"
            : "w-full flex bg-gray-200 dark:bg-gray-900 rounded-xl p-2"
        }
      >
        <label className="sr-only">Enter text to search</label>
        <input
          type="text"
          id="search"
          name="search"
          className="grow-2 px-4 py-2 font-extrabold text-xl rounded-xl placeholder:text-gray-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for any word..."
          aria-describedby="help-text"
          aria-invalid={!help ? "false" : "true"}
        />
        <button
          type="submit"
          className="text-purple-500 flex-none px-4 rounded-xl"
        >
          <span className="sr-only">Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"
            />
          </svg>
        </button>
      </form>
      {help && (
        <p
          id="help-text"
          aria-live="assertive"
          aria-atomic="true"
          className="text-red-500 text-xl"
        >
          {help}
        </p>
      )}
      {error && (
        <div className="text-center mt-20">
          <span className="text-5xl">😕</span>
          <h2 className="text-2xl font-bold mt-10 mb-4">{error}</h2>
          <p className="text-gray-500">
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at later time or head to
            the web instead.
          </p>
        </div>
      )}
      {definition && (
        <section className="my-10">
          <div className="flex gap-4 justify-between items-center">
            <div>
              <h1 className="text-6xl font-extrabold my-4">
                {definition.word}
              </h1>
              <p className="text-purple-500 text-2xl">{definition.phonetic}</p>
            </div>
            <button onClick={playAudio} className="text-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="75"
                height="75"
                viewBox="0 0 75 75"
              >
                <g fill="currentColor" fillRule="evenodd">
                  <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" />
                  <path d="M29 27v21l21-10.5z" />
                </g>
              </svg>
            </button>
          </div>
          {definition.meanings.map((meaning: Meaning, index: number) => {
            return (
              <div key={meaning.partOfSpeech + index}>
                <h2 className="my-4 font-bold italic text-2xl flex items-center gap-4">
                  <div>{meaning.partOfSpeech}</div>
                  <div className="h-[1px] bg-gray-300 dark:bg-gray-700 w-full"></div>
                </h2>
                <h3 className="my-4 text-xl text-gray-500">Meaning</h3>
                <ul className="list-disc ms-10 mb-10 text-purple-500 text-lg">
                  {meaning.definitions.map((definition, index: Number) => {
                    return (
                      <li key={"definition" + index} className="my-3">
                        <div className="text-gray-950 dark:text-white">
                          {definition.definition}
                        </div>
                        {definition.example && (
                          <div className="my-2 text-gray-500">
                            "{definition.example}"
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {(meaning.synonyms?.length ?? 0) > 0 && (
                  <>
                    <h3 className="my-4 text-xl text-gray-500 inline me-4">
                      Synonyms
                    </h3>
                    <ul className="inline text-xl">
                      {meaning.synonyms!.map((synonym, index: number) => {
                        return (
                          <li
                            key={synonym.trim().replaceAll(" ", "-") + index}
                            className="inline border-e border-gray-300 last-of-type:border-e-0"
                          >
                            <button
                              className="text-purple-500 font-bold m-3 cursor-pointer"
                              onClick={() => {
                                setQuery(synonym);
                                handleSearch(undefined, synonym);
                              }}
                            >
                              {synonym}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
            );
          })}
          {definition.sourceUrls && (
            <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
              <h2 className="underline underline-offset-2 md:inline me-4 text-gray-500">
                Source
              </h2>
              <p className="underline underline-offset-2 md:inline">
                <a
                  href={definition.sourceUrls[0]}
                  className="inline-flex gap-3 items-center"
                >
                  <span>{definition.sourceUrls[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"
                    />
                  </svg>
                </a>
              </p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

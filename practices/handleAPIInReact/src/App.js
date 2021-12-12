import React from "react";
import './App.css';
import Articles from "./features/Articles/Articles";
import Users from "./features/Users/Users";

export default function App() {
  return (
    <div>
      <section>
        <Articles/>
      </section>
      <section>
        <Users/>
      </section>
    </div>
  );
}

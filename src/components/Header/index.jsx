import React from "react";
// functional component named Header
function Header() {
  return (
    // container div with styling applied
    <div className="mt-10 flex flex-col gap-5 items-center justify-center text-white">
      <h1 className="text-5xl font-bold">
        More jobs equal a better world, start the search
      </h1>
      <p className="text-xl">Get latest job openings that best suits you!</p>
    </div>
  );
}

export default Header;

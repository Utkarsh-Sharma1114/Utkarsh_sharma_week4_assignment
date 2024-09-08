import React from "react";
import { useState } from "react";

function SearchBar(props) {
  // initialize state
  const [jobCriteria, setJobCriteria] = useState({
    title: "",
    experience: "",
    location: "",
    type: "",
  });
  // handle on changes in select inputs
  const handleOnChange = (event) => {
    // update the job criteria state based on the input
    setJobCriteria((prevState) => ({
      ...prevState, // preserve the previous state
      [event.target.name]: event.target.value, // update the specified field
    }));
  };
  console.log(jobCriteria); // for debugging purposes

  // function to handle the search
  const search = async () => {
    await props.fetchJobsCustom(jobCriteria); // call the fetchJobsCustom function passed via props with the current job criteria
  };

  return (
    <div className="flex gap-4 my-10 justify-center px-10">
      <select
        onChange={handleOnChange}
        name="title"
        value={jobCriteria.title}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Job Role
        </option>
        <option value="os Developer">ios Developer</option>
        <option value="Frontend Developer">Frontend Developer</option>
        <option value="Backend Developer">Backend Developer</option>
        <option value="Android Developer">Android Developer</option>
        <option value="Developer Advocate">Developer Advocate</option>
      </select>

      <select
        onChange={handleOnChange}
        name="type"
        value={jobCriteria.type}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Job Type
        </option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
      </select>

      <select
        onChange={handleOnChange}
        name="location"
        value={jobCriteria.location}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Location
        </option>
        <option value="Remote">Remote</option>
        <option value="In-Office">In-Office</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      <select
        onChange={handleOnChange}
        name="experience"
        value={jobCriteria.experience}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
          Experience
        </option>
        <option value="Fresher">Fresher</option>
        <option value="Junior Level">Junior Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>

      <button
        onClick={search}
        className="w-64 bg-blue-500 text-white font-bold py-3 rounded-md"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

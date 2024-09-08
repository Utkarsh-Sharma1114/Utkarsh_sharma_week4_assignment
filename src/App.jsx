import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
// import jobData from "./JobDummyData";  // uncomment if using dummy data
import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"; // Firestore functions
import { db } from "./firebase.config"; //firebase configuration

function App() {
  // State to store the list of jobs
  const [jobs, setJobs] = useState([]);
  // track if custom search is active
  const [customSearch, setCustomSearch] = useState(false);

  // function to fetch jobs from Firestore
  const fetchJobs = async () => {
    setCustomSearch(false); // reset custom search
    const tempJobs = []; // temporary array to store jobs
    const jobsRef = query(collection(db, "jobs")); // reference to the 'jobs' collection
    const q = query(jobsRef, orderBy("postedOn", "desc")); // query to get jobs ordered by posted date
    const req = await getDocs(q); // execute the query

    // process job document
    req.forEach((job) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());

      // push job data to the temporary array
      tempJobs.push({
        ...job.data(),
        id: job.id, // add job id
        postedOn: job.data().postedOn.toDate(), // convert firestore timestamp to java script date
      });
    });
    setJobs(tempJobs); // update state with fetched jobs
  };

  // function to fetch jobs based on custom search criteria
  const fetchJobsCustom = async (jobCriteria) => {
    setCustomSearch(true); // set custom search state to true
    const tempJobs = []; // temporary array to store jobs
    const jobsRef = query(collection(db, "jobs")); // reference to the jobs collection
    const q = query(
      jobsRef,
      // filter by type, title, experience, location and posted on
      where("type", "==", jobCriteria.type),
      where("title", "==", jobCriteria.title),
      where("experience", "==", jobCriteria.experience),
      where("location", "==", jobCriteria.location),
      orderBy("postedOn", "desc")
    );

    // process job document
    const req = await getDocs(q);
    req.forEach((job) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      tempJobs.push({
        ...job.data(),
        id: job.id,
        postedOn: job.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
  };

  //fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs(); // call function
  }, []); // empty dependancies

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="pg-blue-500 px-10 py-2 rounded-md text-white">
            Clear Filters
          </p>
        </button>
      )}
      {/* render a jobcard for each job in the jobs state */}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;

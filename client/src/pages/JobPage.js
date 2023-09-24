import React from 'react'
import JobPostDetails from '../components/JobPostDetails';

export default function JobPage() {

  const currentURL = window.location.href;
  const parts = currentURL.split('/');
  const jobId = parts[parts.length - 1];

  return (
    
    <JobPostDetails id = {jobId} />
  )
}

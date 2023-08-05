const { BadRequestError, NotFoundError } = require('../errors')
const notFound = require('../middleware/not-found')
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  console.log(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const getJob = async (req, res) => {
  // const {jobId} = req.params
  // createdBy = req.user.userId
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  //    | from user get userId,from params get id and give alias name as _id
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`)
  }

  res.status(StatusCodes.OK).json({ job })
}
const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { company, position },
  } = req
  if (company === ' ' || position === ' ') {
    throw new BadRequestError('Company and Postion fields can not be empty')
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No Job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json(job)
}
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job Exists with id ${jobId}`)
  }
  // console.log(req.params,job)

  res.status(StatusCodes.OK).json()
}

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }

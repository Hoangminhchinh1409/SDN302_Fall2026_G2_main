const Appointment = require('../models/Appointment');

const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id }).populate('service pet');
  res.json(appointments);
};

const createAppointment = async (req, res) => {
  const { serviceId, petId, date } = req.body;
  const appointment = await Appointment.create({
    user: req.user._id,
    service: serviceId,
    pet: petId,
    date
  });
  res.status(201).json(appointment);
};

module.exports = { getMyAppointments, createAppointment };

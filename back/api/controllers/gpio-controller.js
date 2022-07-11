import { getOutputPinsList, statusByPinAsync, statusPinsAsync, switchStatusAsync } from '../../automation/gpio.js';

export const statuses = async (req, res) => {
  const status = await statusPinsAsync();
  res.status(200).json(status);
}

export const statusByName = async (req, res) => {
  const status = await statusByPinAsync(req.params && req.params['pinName']);
  res.status(200).json(status);
}

export const updateStatus = async (req, res) => {
  const {pinName, pinStatus} = req.body ?? {};
  const status = await switchStatusAsync(pinName, pinStatus);
  res.status(200).json(status);
}

export const gpioList = async (req, res) => {
  const status = getOutputPinsList();
  res.status(200).json(status);
}

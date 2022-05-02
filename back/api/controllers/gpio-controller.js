import { statusByPinAsync, statusPinsAsync, switchStatusAsync } from '../../automation/gpio.js';

export async function statuses(req, res) {
  const status = await statusPinsAsync();
  res.status(200).json(status);
}

export async function statusByName(req, res) {
  const status = await statusByPinAsync(req.params && req.params['pinName']);
  res.status(200).json(status);
}

export async function updateStatus(req, res) {
  const {pinName, pinStatus} = req.body ?? {};
  const status = await switchStatusAsync(pinName, pinStatus);
  res.status(201).json(status);
}

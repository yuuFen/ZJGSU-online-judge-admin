function getClass(req, res, u) {
  const result = {
    code: 0,
    msg: 'success',
    data: [
      {
        id: 100,
        nick: 'test_nick1',
        createAt: '2020-07-08 16:14:22',
      },
      {
        id: 101,
        nick: 'test_nick2',
        createAt: '2020-07-08 16:14:22',
      },
    ],
  };
  return res.json(result);
}

export default {
  'GET /api/class': getClass,
};

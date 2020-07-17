function getOrgan(req, res, u) {
  const result = {
    code: 0,
    msg: 'success',
    data: [
      {
        id: 100,
        nick: 'test_nick1',
        createAt: '2020-07-08 16:14:22',
        status: '2',
        parent: [
          {
            id: 101,
            nick: 'test_nick2',
          },
          {
            id: 102,
            nick: 'test_nick3',
          },
        ],
      },
      {
        id: 101,
        nick: 'test_nick2',
        createAt: '2020-07-08 16:14:22',
        status: '1',
        parent: [
          {
            id: 102,
            nick: 'test_nick3',
          },
        ],
      },
    ],
  };
  return res.json(result);
}

export default {
  'GET /api/organ': getOrgan,
};

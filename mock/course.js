function getCourse(req, res, u) {
  const result = {
    code: 0,
    msg: 'success',
    data: [
      {
        id: 100,
        nick: 'test_nick_course',
        introduction: '这是课程',
        createAt: '2020-07-08 16:14:22',
        aim: '冲冲冲',
        userId: 101,
        orgnId: 100,
      },
      {
        id: 101,
        nick: 'test_nick_course',
        introduction: '这也是课程',
        createAt: '2020-07-08 16:14:22',
        aim: '不让他们冲冲冲',
        userId: 102,
        orgnId: 103,
      },
    ],
  };
  return res.json(result);
}

export default {
  'GET /api/course': getCourse,
};


const lessons = [
  {
    "date": "2021-04-28",
    "mentor": {
      "id": 27,
      "fullName": "Lưu Đức Trung",
      "username": "trung.luuduc"
    },
    "mentees": [
      {
        "status": "Deferred",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 9,
        "fullName": "Đào Tuấn Anh",
        "username": "anh.daotuan"
      },
      {
        "status": "Pending",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 10,
        "fullName": "Phan Đoàn Cương",
        "username": "cuong.phandoan"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 19,
        "fullName": "Nguyễn Tùng Lâm",
        "username": "lam.nguyentung"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 20,
        "fullName": "Nguyễn Thị Yến",
        "username": "yen.nguyenthi"
      }
    ],
    "id": 1,
    "name": "Lesson 1"
  },
  {
    "date": "2021-04-30",
    "mentor": {
      "id": 27,
      "fullName": "Lưu Đức Trung",
      "username": "trung.luuduc"
    },
    "mentees": [
      {
        "status": "Deferred",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 9,
        "fullName": "Đào Tuấn Anh",
        "username": "anh.daotuan"
      },
      {
        "status": "Pending",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 10,
        "fullName": "Phan Đoàn Cương",
        "username": "cuong.phandoan"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 19,
        "fullName": "Nguyễn Tùng Lâm",
        "username": "lam.nguyentung"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 20,
        "fullName": "Nguyễn Thị Yến",
        "username": "yen.nguyenthi"
      }
    ],
    "id": 2,
    "name": "Lesson 2"
  },
  {
    "date": "2021-05-01",
    "mentor": {
      "id": 27,
      "fullName": "Lưu Đức Trung",
      "username": "trung.luuduc"
    },
    "mentees": [
      {
        "status": "Deferred",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 9,
        "fullName": "Đào Tuấn Anh",
        "username": "anh.daotuan"
      },
      {
        "status": "Pending",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": "2021-04-29",
        "type": "A",
        "id": 10,
        "fullName": "Phan Đoàn Cương",
        "username": "cuong.phandoan"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 19,
        "fullName": "Nguyễn Tùng Lâm",
        "username": "lam.nguyentung"
      },
      {
        "status": "Active",
        "lessonStatus": "Active",
        "joinedDate": "2021-07-12",
        "endDate": null,
        "type": "P",
        "id": 20,
        "fullName": "Nguyễn Thị Yến",
        "username": "yen.nguyenthi"
      }
    ],
    "id": 3,
    "name": "Lesson 3"
  }
];

const classData = [
  {
    id: "1",
    class: "Rocket 12",
  },
  {
    id: "2",
    class: "Railway 11",
  },
  {
    id: "3",
    class: "Rocket 10",
    owned: true,

  },
  {
    id: "4",
    class: "Railway 08",
  },
  {
    id: "5",
    class: "Rocket 09",
    owned: true,
  },
  {
    id: "6",
    class: "Rocket 03",
  },
  {
    id: "7",
    class: "Rocket 12",
    owned: true,
  },
  {
    id: "8",
    class: "Railway 11",
  },
  {
    id: "9",
    class: "Rocket 10",
    owned: true,
  },
  {
    id: "10",
    class: "Railway 08",
  },
  {
    id: "11",
    class: "Rocket 09",
  },
  {
    id: "12",
    class: "Rocket 03",
    owned: true,
  },
  {
    id: "13",
    class: "Rocket 12",
  },
  {
    id: "14",
    class: "Railway 11",
  },
  {
    id: "15",
    class: "Rocket 10",
    owned: true,
  },
  {
    id: "16",
    class: "Railway 08",
  },
  {
    id: "17",
    class: "Rocket 09",
  },
  {
    id: "18",
    class: "Rocket 03",
    owned: true,
  },
  {
    id: "19",
    class: "Rocket 12",
  },
  {
    id: "20",
    class: "Railway 11",
  },
  {
    id: "21",
    class: "Rocket 10",
    owned: true,
  },
  {
    id: "22",
    class: "Railway 08",
  },
  {
    id: "23",
    class: "Rocket 09",
    owned: true,
  },
  {
    id: "24",
    class: "Rocket 03",
  },
]

const mentorData =
{
  id: "01",
  name: "Duy Nguyen",
}

const subjectData = [
  {
    id: "1",
    name: "Full-stack Non IT",
    icon: "<AppstoreAddOutlined />"
  },
  {
    id: "2",
    name: "Full-stack IT",
    icon: "<AppstoreOutlined />"
  },
  {
    id: "3",
    name: "Tester",
    icon: "<ExpandOutlined />"
  },
  {
    id: "4",
    name: "AWS",
    icon: "<DeploymentUnitOutlined />"
  },
]

const classDetails =
{
  name: "Railway 08",
  startDate: "20/03/2021",
  numberOfMentees: 10,
  mentor: "Nguyen Ngoc Duy"
}

const classDates = [
  { title: 'Student name', dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '03/06', dataIndex: '03/06', key: 'dates' },
  { title: '05/06', dataIndex: '05/06', key: 'dates' },
  { title: '08/06', dataIndex: '08/06', key: 'dates' },
  { title: '10/06', dataIndex: '10/06', key: 'dates' },
  { title: '12/06', dataIndex: '12/06', key: 'dates' },
  { title: '15/06', dataIndex: '15/06', key: 'dates' },
  { title: '17/06', dataIndex: '17/06', key: 'dates' },
  { title: '19/06', dataIndex: '19/06', key: 'dates' },
  { title: '22/06', dataIndex: '22/06', key: 'dates' },
  { title: '24/06', dataIndex: '24/06', key: 'dates' },
  { title: '26/06', dataIndex: '26/06', key: 'dates' },
  { title: '29/06', dataIndex: '29/06', key: 'dates' },
]

const attendanceChecks = [
  {
    name: "Bui Quang Huy",
    "03/06": "P",
    "05/06": "P",
    "08/06": "P",
    "10/06": "P",
    "12/06": "P",
    "15/06": null,
    "17/06": null,
    "19/06": null,
    "22/06": null,
    "24/06": null,
    "26/06": null,
    "29/06": null,

  },
  {
    name: "Tran Quang Huy",
    "03/06": "P",
    "05/06": "P",
    "08/06": "A",
    "10/06": "P",
    "12/06": "P",
    "15/06": null,
    "17/06": null,
    "19/06": null,
    "22/06": null,
    "24/06": null,
    "26/06": null,
    "29/06": null,

  },
  {
    name: "Nguyen Quang Huy",
    "03/06": "A",
    "05/06": "P",
    "08/06": "A",
    "10/06": "P",
    "12/06": "P",
    "15/06": null,
    "17/06": null,
    "19/06": null,
    "22/06": null,
    "24/06": null,
    "26/06": null,
    "29/06": null,
  },
  {
    name: "Hoang Quang Huy",
    "03/06": "A",
    "05/06": "A",
    "08/06": "A",
    "10/06": "P",
    "12/06": "P",
    "15/06": null,
    "17/06": null,
    "19/06": null,
    "22/06": null,
    "24/06": null,
    "26/06": null,
    "29/06": null,
  },
  {
    name: "Ta Quang Huy",
    "03/06": "P",
    "05/06": "P",
    "08/06": "P",
    "10/06": "P",
    "12/06": "P",
    "15/06": null,
    "17/06": null,
    "19/06": null,
    "22/06": null,
    "24/06": null,
    "26/06": null,
    "29/06": null,
  }
]

export { classData, subjectData, mentorData, classDetails, classDates, attendanceChecks, lessons };

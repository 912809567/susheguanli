const { databaseConfig } = require("../config")
const db = require("./index")
const User = require("../model/user_model")
const Token = require("../model/token_model")
const CleanRecord = require("../model/cleanRecord_model")
const BackRecord = require("../model/backRecord_model")
const GetupRecord = require("../model/getupRecord_model")
const Room = require("../model/room_model")
const Floor = require("../model/floor_model")
const Building = require("../model/building_model")
const Cleaner = require("../model/cleaner_model")
const Evaluate = require("../model/evaluate_model")

// 创建表关系
User.hasMany(Token)
User.hasMany(CleanRecord)
User.hasMany(BackRecord)
User.hasMany(GetupRecord)
User.hasMany(Evaluate)
User.belongsTo(Room)

Room.hasMany(User)
Room.hasMany(CleanRecord)
Room.hasMany(BackRecord)
Room.hasMany(GetupRecord)
Room.hasMany(Evaluate)
Room.belongsTo(Floor)
Room.belongsTo(Building)

Evaluate.belongsTo(User)
Evaluate.belongsTo(Room)

CleanRecord.belongsTo(User)
CleanRecord.belongsTo(Room)

GetupRecord.belongsTo(User)
GetupRecord.belongsTo(Room)

BackRecord.belongsTo(User)
BackRecord.belongsTo(Room)

Floor.hasMany(Room)
Floor.belongsTo(Building)
Floor.belongsTo(Cleaner)

Cleaner.hasMany(Floor)
Cleaner.belongsTo(Building)

Building.hasMany(Floor)
Building.hasMany(Room)
Building.hasMany(Cleaner)

Building.belongsToMany(User, { as: "Admins", through: "admins" })
User.belongsToMany(Building, { as: "", through: "admins" })

// 生成默认数据
const { hash } = require("../utils/bcypt")
async function createDefaultData() {
  // 创建一个学生用户
  const student = await User.create({
    account: "123456",
    password: hash("123456"),
    role: "student"
  })
  // 创建一个管理员用户
  const admin = await User.create({
    account: "admin",
    password: hash("123456"),
    role: "admin",
    name: "小明"
  })
  // 创建一个超级管理员用户
  const superAdmin = await User.create({
    account: "superAdmin",
    password: hash("123456"),
    role: "superAdmin",
    name: "小李"
  })

  // 创建宿舍楼
  const building = await Building.createBuilding({
    name: "西三"
  })
  await Building.createBuilding({
    name: "西四"
  })
  // 将创建的宿舍楼与 admin 做关联
  await Building.addAdmin(building.id, admin.id)

  // 创建保洁员
  const cleaner = await Cleaner.createCleaner({
    name: "清洁阿姨",
    phone: "15766666666"
  })
  // 为宿舍楼添加保洁员
  await Building.addCleaner(building.id, cleaner.id)

  // 创建楼层
  for (let i = 0; i < 10; i++) {
    const layer = i + 1
    const floor = await Floor.createFloor({
      layer,
      buildingId: null
    })
    await Building.addFloor(building.id, floor)
  }

  // 创建宿舍
  const floor = await Floor.findOne({
    where: { buildingId: building.id, layer: 1 }
  })
  const room = await Room.createRoom({
    number: 101,
    floorId: floor.id,
    buildingId: floor.buildingId
  })
  // 为宿舍添加多个学生
  await User.create({
    account: "111111",
    password: hash("123456"),
    name: "爱仕达",
    role: "student",
    phone: "12345678901",
    roomId: room.id,
    checkTime: new Date()
  })
  await User.create({
    account: "222222",
    password: hash("123456"),
    name: "任天野",
    role: "student",
    phone: "12345678902",
    roomId: room.id,
    checkTime: new Date()
  })

  // 创建评价
  const evaluate = await Evaluate.createEvaluate({
    score: 98,
    note: "宿舍干净整洁",
    userId: admin.id,
    roomId: room.id
  })
}

module.exports = function () {
  // 同步表数据
  console.log("DataBase Syncing ... ...")
  db.sequelize
    .sync({
      force: databaseConfig.rebuild
    })
    .then(() => {
      if (databaseConfig.rebuild) {
        createDefaultData()
      }
    })
    .then(() => {
      console.log("DataBase Sync done")
    })
}

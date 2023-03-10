// TDD for static methods

import {AnnounceRecord} from "../records/announce.record";
import {pool} from "../utils/db";
import {AnnounceEntity} from "../types";

afterAll(async () => {
  await pool.end();
});

test("Announcement records returns data from database for one entry.", async () => {
  const announcement = await AnnounceRecord.findOne("abc");
  // console.log(announcement);
  expect(announcement).toBeDefined();
  expect(announcement.id).toBe("abc");
  expect(announcement.name).toBe("Testowe");
  expect(announcement.price).toBe(22);
  expect(announcement.description).toBe("Test description");
  expect(announcement.latitude).toBe(50.0688456);
  expect(announcement.longitude).toBe(19.9143048);
  expect(announcement.url).toBe("url");
});

test("Announcement records returns null from database for entry that not exists.", async () => {
  const announcement = await AnnounceRecord.findOne("123");
  expect(announcement).toBeNull();
});

test("Announcement records returns smaller amount of data, when searching for 'a'.", async () => {
  const announcements = await AnnounceRecord.findAll("e");
  expect(announcements).not.toEqual([]);
  expect(announcements[0].id).toBeDefined();
});

test("Announcement records returns empty array, when searching for something that does not exists.", async () => {
  const announcements = await AnnounceRecord.findAll("------------");
  expect(announcements).toBeNull();
});

test("Announcement records returns smaller amount of data, when searching for ''.", async () => {
  const announcements = await AnnounceRecord.findAll("");
  expect(announcements).not.toBeNull();
  expect(announcements[0].id).toBeDefined();
  // 'as AnnounceEntity to let typescript work'
  expect((announcements[0] as AnnounceEntity).price).toBeUndefined();
  expect((announcements[0] as AnnounceEntity).description).toBeUndefined();
});

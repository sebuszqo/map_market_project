// TDD for static methods

import {AnnounceRecord} from "../records/announce.record";
import {pool} from "../utils/db";

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

test("Announcement records returns array of found entries, when searching for 'a'.", async () => {
  const announcements = await AnnounceRecord.findAll("e");
  console.log(announcements);
  expect(announcements).not.toEqual([]);
  expect(announcements[0].id).toBeDefined();
});

test("Announcement records returns empty array, when searching for something that does not exists.", async () => {
  const announcements = await AnnounceRecord.findAll("------------");
  expect(announcements).toBeNull();
});

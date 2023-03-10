import {AnnounceRecord} from "../records/announce.record";
import {pool} from "../utils/db";

const defaultObj = {
    name: "[Test]Test name",
    description: "this is test description",
    price: 8,
    url: "some url",
    latitude: 9,
    longitude: 9,
};

afterAll(async () => {
    await pool.end();
});

test("Can build AnnouncementRecord", () => {
    const announcement = new AnnounceRecord({
        ...defaultObj,
    });
    expect(announcement.name).toBe("[Test]Test name");
    expect(announcement.description).toBe("this is test description");
    expect(announcement.price).toBe(8);
    expect(announcement.url).toBe("some url");
    expect(announcement.latitude).toBe(9);
  expect(announcement.longitude).toBe(9);
});

test("Validates invalid prices", () => {
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        price: -10,
      })
  ).toThrow("Price cannot be negative or bigger than 1 000 000.");
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        price: 100000000,
      })
  ).toThrow("Price cannot be negative or bigger than 1 000 000.");
});

test("Validates invalid name ", () => {
  const longName = "a".repeat(101);
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        name: "",
      })
  ).toThrow("Name cannot be empty or longer than 100.");
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        name: longName,
      })
  ).toThrow("Name cannot be empty or longer than 100.");
});

// used any to make it works - typescript prevent from passing something different from number, and that is what we are validating in constructor
test("Validates invalid latitude and longitude ", () => {
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        latitude: "" as any,
        longitude: "" as any,
      })
  ).toThrow("Sorry, we couldn't locate the address.");
});

test("Validates invalid urls", () => {
  const longName = "a".repeat(101);
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        url: longName,
      })
  ).toThrow("Your url, cannot be longer than 100 chars.");
  expect(
    () =>
      new AnnounceRecord({
        ...defaultObj,
        url: "",
      })
  ).toThrow("Your url, cannot be longer than 100 chars.");
});

test("Validates invalid description", () => {
    const longName = "a".repeat(1001);
    expect(
        () =>
            new AnnounceRecord({
                ...defaultObj,
                description: longName,
            })
    ).toThrow("Description cannot be longer than 1000 chars.");
});

test("Announcement records returns new UUID", async () => {
    const announcement = new AnnounceRecord({
        ...defaultObj,
    });
    await announcement.insert();
    expect(announcement.id).toBeDefined();
    expect(typeof announcement.id).toBe("string");
});

test("Announcement records inserts dada to database.", async () => {
    const announcement = new AnnounceRecord({
        ...defaultObj,
    });
    await announcement.insert();
    const foundAnnouncement = await AnnounceRecord.findOne(announcement.id);
    expect(foundAnnouncement).toBeDefined();
    expect(foundAnnouncement.id).toBeDefined();
    expect(foundAnnouncement.id).toBe(announcement.id);
    expect(announcement).not.toBeNull();
});

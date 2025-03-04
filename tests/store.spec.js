import { describe, expect, it } from "vitest";
import pages from "./mocks/pages/manifest";
import { harnessStore } from "../src/harness";
import createHarnessStore from "../src/store/createHarnessStore";
import { createPinia } from "pinia";

// creating vue instance with test pages/harness mocked
const page = new pages[0]();

function mockHs() {
  const pinia = createPinia();
  const harness = harnessStore(pinia);
  const pageFunc = createHarnessStore(page, pinia);
  const pageStore = pageFunc(pinia);
  harness.addStore(page.key, page, pageFunc);
  return pageStore;
}

export { page, mockHs };
describe("DV Helper Init", () => {
  it("Initializes Succesfully", () => {
    let hs = mockHs();
    expect(hs).toBeTruthy();
  });
  it("Has charts", () => {
    let hs = mockHs();
    expect(hs.charts).toEqual(page.charts());
  });
  it("Has filters", () => {
    let hs = mockHs();
    expect(hs.filters).toEqual(page.filters());
  });
  it("Maps chart getters", () => {
    let hs = mockHs();
    Object.keys(page.charts()).forEach((chartKey) => {
      expect(hs[chartKey + "ChartData"]).toBeNull();
    });
  });
  it("Maps filter getters", () => {
    let hs = mockHs();
    Object.keys(page.filters()).forEach((filterKey) => {
      expect(hs[filterKey + "Filter"]).toBeTruthy();
    });
  });
});

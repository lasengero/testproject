import { Locator, Page } from "@playwright/test";

export class MenuPage {
  readonly page: Page;
  readonly home: Locator;
  readonly aboutUs: Locator;
  readonly services: Locator;
  readonly products: Locator;
  readonly locations: Locator;
  readonly forums: Locator;
  readonly siteMaps: Locator;
  readonly contactUs: Locator;

  readonly homeUrl: String;
  readonly aboutUsUrl: String;
  readonly servicesUrl: String;
  readonly productsUrl: String;
  readonly locationsUrl: String;
  readonly forumsUrl: String;
  readonly siteMapsUrl: String;
  readonly contactUsUrl: String;

  constructor(page: Page) {
    this.page = page;

    this.home = page.locator('#footerPanel', { hasText: 'Home' });
    this.aboutUs = page.locator('#footerPanel a[href="about.htm"]');
    this.services = page.locator('#footerPanel a[href="services.htm"]');
    this.products = page.locator('#footerPanel a[href*="http://www.parasoft.com/jsp/products.jsp"]');
    this.locations = page.locator('#footerPanel a[href="http://www.parasoft.com/jsp/pr/contacts.jsp"]');
    this.forums = page.locator('#footerPanel a[href="http://forums.parasoft.com/"]');
    this.siteMaps = page.locator('#footerPanel a[href="sitemap.htm"]');
    this.contactUs = page.locator('#footerPanel a[href="contact.htm"]');

    this.homeUrl = 'index.htm';
    this.aboutUsUrl = 'about.htm';
    this.servicesUrl = 'services.htm';
    this.productsUrl = 'https://www.parasoft.com/products/';
    this.locationsUrl = 'https://www.parasoft.com/solutions/';
    this.forumsUrl = 'https://forums.parasoft.com/';
    this.siteMapsUrl = 'sitemap.htm';
    this.contactUsUrl = 'contact.htm';

  } 

}
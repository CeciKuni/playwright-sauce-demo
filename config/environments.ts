type Environment = {
  baseURL: string;
};

const environments: Record<string, Environment> = {
  dev: {
    baseURL: 'https://www.saucedemo.com/',
  },
  testing: {
    baseURL: 'https://www.saucedemo.com/',
  },
  prod: {
    baseURL: 'https://www.saucedemo.com/',
  },
};

export function getEnv() {
  const env = process.env.ENV || 'testing';
  return environments[env];
}

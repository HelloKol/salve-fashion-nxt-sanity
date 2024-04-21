interface AppConfig {
  projectId: string
  dataset: string
  studioTitle: string
}

class Config {
  private readonly defaults: AppConfig = {
    projectId: '',
    dataset: '',
    studioTitle: '',
  }

  private readonly envConfig: Partial<AppConfig>

  constructor() {
    // Load environment-specific values
    this.envConfig = {
      projectId: process.env.SANITY_STUDIO_ID,
      dataset: process.env.SANITY_STUDIO_DATASET,
      studioTitle: process.env.SANITY_STUDIO_TITLE,
    }
  }

  get(): AppConfig {
    return {...this.defaults, ...this.envConfig}
  }
}

export default new Config().get()

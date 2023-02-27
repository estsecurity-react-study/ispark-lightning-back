import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Module({
  exports: [Supabase],
})
export class Supabase {
  private client: SupabaseClient;
  constructor(private readonly configService: ConfigService) {}

  async getClient() {
    console.log('SUPABASE_URL => ', this.configService.get('SUPABASE_URL'));
    if (this.client) {
      console.log('Already assigned Supbase-client...');
      return this.client;
    }
    this.client = await createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    console.log(this.client);
    const admin = await this.client.auth.getUser();
    console.log(admin);
    return this.client;
  }
}

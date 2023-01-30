import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
@Module({
  exports: [Supabase],
})
export class Supabase {
  private client: SupabaseClient;
  constructor(private readonly configService: ConfigService) {}

  getClient() {
    console.log(this.configService.get('SUPABASE_URL'));
    if (this.client) {
      console.log('Already assigned Supbase-client...');
      return this.client;
    }
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_KEY'),
    );
    return this.client;
  }
}

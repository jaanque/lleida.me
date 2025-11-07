import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('users')
      .select('username')
      .eq('username', username);

    if (error) {
      console.error('Error checking username:', error);
      return true; // Assume taken on error
    }

    return data.length > 0;
  }

  async register(username: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ username, password: hashedPassword }]);

    if (error) {
      console.error('Error registering user:', error);
      return null;
    }

    return data;
  }

  async getUser(username: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error getting user:', error);
      return null;
    }

    return data;
  }
}

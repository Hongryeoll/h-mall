'use client';

import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createSupabaseBrowserClient } from '@/library/client/supabase';

export default function AuthUI() {
  const supabase = createSupabaseBrowserClient();
  return (
    // <section className="w-full">
    //   <div className="mx-auto max-w-[500px]">
    <section className="w-full">
      <div className="w-full max-w-md mx-auto p-4">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          onlyThirdPartyProviders
          providers={['google', 'github']}
        />
      </div>
    </section>
  );
}

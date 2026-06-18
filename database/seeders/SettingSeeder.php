<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'site_name'          => 'Hibiscus Efsya',
            'site_tagline'       => 'Part of M.B.K Indonesia',
            'site_description'   => 'Produk kecantikan dan perawatan tubuh berkualitas dari M.B.K Indonesia',
            'hero_title'         => 'Hibiscus Efsya',
            'hero_subtitle'      => '✦ part of M.B.K Indonesia ✦ Deodorant Roll On ✦ P.O. Powder ✦ Bedak Biang Keringat ✦ Halal & Berkualitas',
            'hero_description'   => 'Temukan rangkaian produk perawatan tubuh berkualitas dari M.B.K Indonesia. Deodorant, bedak, body mist, dan body lotion untuk kesegaran dan kesehatan kulit Anda setiap hari.',
            'about_title'        => 'Tentang Hibiscus Efsya',
            'about_content'      => 'Hibiscus Efsya adalah brand produk perawatan tubuh dibawah naungan M.B.K Indonesia. Kami berkomitmen menghadirkan produk-produk berkualitas yang aman dan efektif untuk menjaga kesehatan dan kesegaran tubuh Anda sehari-hari.',
            'contact_address'    => 'Jakarta, Indonesia',
            'contact_email'      => 'info@hibiscusefsya.com',
            'contact_phone'      => '+62 812 3456 7890',
            'contact_whatsapp'   => '6281234567890',
            'social_instagram'   => 'https://instagram.com/hibiscusefsya',
            'social_facebook'    => 'https://facebook.com/hibiscusefsya',
            'social_shopee'      => 'https://shopee.co.id/hibiscusefsya',
            'social_tokopedia'   => 'https://tokopedia.com/hibiscusefsya',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}

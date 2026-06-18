<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $deodorantId = Category::where('slug', 'deodorant-roll-on')->first()->id;
        $powderId    = Category::where('slug', 'po-powder')->first()->id;
        $biangId     = Category::where('slug', 'bedak-biang-keringat')->first()->id;
        $mistId      = Category::where('slug', 'body-mist')->first()->id;
        $lotionId    = Category::where('slug', 'body-lotion')->first()->id;

        $wa          = '6281234567890';
        $shopee      = 'https://shopee.co.id/hibiscusefsya';
        $tokopedia   = 'https://www.tokopedia.com/hibiscusefsya';

        $products = [
            // ── Deodorant Roll On ──────────────────────────────────────────
            [
                'name'           => 'MBK Deodorant Roll On Pink (Women)',
                'slug'           => 'mbk-deodorant-roll-on-pink',
                'description'    => 'Deodorant roll on khusus wanita dengan warna pink yang feminin. Tahan lama hingga 24 jam, halal, dan aman untuk kulit sensitif. Efektif mencegah bau badan dan menjaga ketiak tetap kering.',
                'price'          => 15000,
                                'category_id'    => $deodorantId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => true,
            ],
            [
                'name'           => 'MBK Deodorant Roll On Purple (Women)',
                'slug'           => 'mbk-deodorant-roll-on-purple',
                'description'    => 'Deodorant roll on wanita varian purple dengan aroma yang lembut dan tahan lama. Formulasi halal yang aman digunakan sehari-hari.',
                'price'          => 15000,
                'category_id'    => $deodorantId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => true,
            ],
            [
                'name'           => 'MBK Deodorant Roll On Black (Men)',
                'slug'           => 'mbk-deodorant-roll-on-black',
                'description'    => 'Deodorant roll on khusus pria dengan desain maskulin warna hitam. Perlindungan maksimal dari bau badan dan keringat berlebih.',
                'price'          => 15000,
                'category_id'    => $deodorantId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => true,
            ],
            [
                'name'           => 'MBK Deodorant Roll On Blue (Men)',
                'slug'           => 'mbk-deodorant-roll-on-blue',
                'description'    => 'Deodorant roll on pria varian biru dengan kesegaran ekstra. Cocok untuk pria aktif yang membutuhkan perlindungan sepanjang hari.',
                'price'          => 15000,
                'category_id'    => $deodorantId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],

            // ── P.O. Powder ────────────────────────────────────────────────
            [
                'name'           => 'MBK P.O. Powder Silver Sachet',
                'slug'           => 'mbk-po-powder-silver-sachet',
                'description'    => 'Bedak tabur M.B.K dalam kemasan sachet praktis. Efektif menyerap keringat berlebih dan menghilangkan bau badan tidak sedap. Terbuat dari tawas, talc, dan parfum berkualitas.',
                'price'          => 35000,
                                'category_id'    => $powderId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => true,
            ],
            [
                'name'           => 'MBK P.O. Powder Putih Tin',
                'slug'           => 'mbk-po-powder-putih-tin',
                'description'    => 'Bedak tabur M.B.K kemasan tin/kaleng yang ekonomis. Halal MUI dan aman digunakan untuk seluruh anggota keluarga. Menjaga kulit tetap kering dan nyaman.',
                'price'          => 14000,
                'category_id'    => $powderId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => true,
            ],
            [
                'name'           => 'MBK P.O. Powder Putih Sachet',
                'slug'           => 'mbk-po-powder-putih-sachet',
                'description'    => 'Bedak tabur putih M.B.K sachet dengan khasiat halal MUI. Memberikan aroma menyenangkan dan menjaga tubuh tetap segar sepanjang hari.',
                'price'          => 26000,
                'category_id'    => $powderId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
            [
                'name'           => 'MBK P.O. Powder Silver Tin Anti Bau',
                'slug'           => 'mbk-po-powder-silver-tin-anti-bau',
                'description'    => 'Varian silver dalam kemasan tin dengan formula anti bau badan yang lebih kuat. Cocok untuk aktivitas berat dan cuaca panas.',
                'price'          => 16000,
                'category_id'    => $powderId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],

            // ── Bedak Biang Keringat ───────────────────────────────────────
            [
                'name'           => 'MBK Bedak Biang Keringat Biru Botol',
                'slug'           => 'mbk-bedak-biang-keringat-biru-botol',
                'description'    => 'Bedak biang keringat M.B.K varian biru dalam kemasan botol. Efektif mengatasi dan mencegah biang keringat, memberikan sensasi dingin dan nyaman.',
                'price'          => 9000,
                'category_id'    => $biangId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
            [
                'name'           => 'MBK Bedak Biang Keringat Hijau Botol',
                'slug'           => 'mbk-bedak-biang-keringat-hijau-botol',
                'description'    => 'Bedak biang keringat varian hijau dengan aroma menthol yang menyegarkan. Cocok untuk bayi dan dewasa.',
                'price'          => 9000,
                'category_id'    => $biangId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
            [
                'name'           => 'MBK Bedak Biang Keringat Hijau Tin',
                'slug'           => 'mbk-bedak-biang-keringat-hijau-tin',
                'description'    => 'Bedak biang keringat kemasan tin dengan formula menthol. Praktis dibawa bepergian.',
                'price'          => 9000,
                'category_id'    => $biangId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
            [
                'name'           => 'MBK Bedak Biang Keringat Biru Tin',
                'slug'           => 'mbk-bedak-biang-keringat-biru-tin',
                'description'    => 'Bedak biang keringat varian biru kemasan tin. Cepat menyerap dan memberikan efek dingin.',
                'price'          => 9000,
                'category_id'    => $biangId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],

            // ── Body Mist & Body Lotion ────────────────────────────────────
            [
                'name'           => 'MBK Body Mist Fresh',
                'slug'           => 'mbk-body-mist-fresh',
                'description'    => 'Body mist M.B.K dengan aroma segar yang tahan lama. Semprot kapan saja untuk kesegaran instan.',
                'price'          => 25000,
                                'category_id'    => $mistId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
            [
                'name'           => 'MBK Eleven Body Lotion',
                'slug'           => 'mbk-eleven-body-lotion',
                'description'    => 'Body lotion dari lini Eleven M.B.K untuk melembabkan dan menutrisi kulit. Tekstur ringan dan cepat menyerap.',
                'price'          => 35000,
                'category_id'    => $lotionId,
                'shopee_link'    => $shopee,
                'tokopedia_link' => $tokopedia,
                'whatsapp'       => $wa,
                'status'         => 'publish',
                'featured'       => false,
            ],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['slug' => $product['slug']], $product);
        }
    }
}


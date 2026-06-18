<?php

namespace Database\Seeders;

use App\Models\Inspiration;
use Illuminate\Database\Seeder;

class InspirationSeeder extends Seeder
{
    public function run(): void
    {
        $inspirations = [
            [
                'title'   => 'Tips Mengatasi Bau Badan',
                'slug'    => 'tips-mengatasi-bau-badan',
                'excerpt' => 'Tips ampuh mengatasi bau badan agar tetap percaya diri sepanjang hari.',
                'content' => '<p>Bau badan disebabkan oleh bakteri yang berkembang di area lembab tubuh. Gunakan deodorant secara teratur dan bedak tabur untuk menyerap keringat berlebih.</p><h2>Penyebab Bau Badan</h2><p>Bau badan terjadi ketika keringat bersentuhan dengan bakteri di kulit. Area yang paling rentan adalah ketiak, kaki, dan selangkangan.</p><h2>Cara Mengatasi</h2><ul><li>Mandi minimal 2x sehari menggunakan sabun antibakteri</li><li>Gunakan deodorant MBK Roll On setelah mandi</li><li>Taburi bedak MBK P.O. Powder di area lipatan kulit</li><li>Gunakan pakaian berbahan menyerap keringat</li><li>Perbanyak minum air putih</li></ul><p>Dengan menggunakan produk MBK secara rutin, bau badan dapat diatasi secara efektif dan kulit tetap segar sepanjang hari.</p>',
                'status'  => 'publish',
            ],
            [
                'title'   => 'Manfaat Bedak Tabur untuk Tubuh',
                'slug'    => 'manfaat-bedak-tabur',
                'excerpt' => 'Kenali berbagai manfaat bedak tabur untuk menjaga kesehatan kulit Anda.',
                'content' => '<p>Bedak tabur M.B.K membantu menjaga kulit tetap kering, menyerap keringat, dan memberikan aroma harum sepanjang hari. Cocok digunakan setelah mandi.</p><h2>Manfaat Utama Bedak Tabur</h2><ul><li>Menyerap keringat berlebih</li><li>Mencegah iritasi dan ruam kulit</li><li>Mengurangi bau badan</li><li>Memberikan sensasi segar dan wangi</li><li>Melindungi kulit dari kelembaban berlebih</li></ul><h2>Cara Pemakaian yang Benar</h2><p>Aplikasikan bedak tabur MBK P.O. Powder pada area kulit yang bersih dan kering setelah mandi. Fokuskan pada area lipatan kulit seperti ketiak, leher, dan selangkangan untuk hasil optimal.</p>',
                'status'  => 'publish',
            ],
            [
                'title'   => 'Cara Memilih Deodorant yang Tepat',
                'slug'    => 'cara-memilih-deodorant',
                'excerpt' => 'Panduan lengkap memilih deodorant sesuai kebutuhan dan jenis kulit.',
                'content' => '<p>Pilih deodorant yang sesuai dengan jenis kulit Anda. M.B.K menyediakan varian untuk wanita dan pria dengan formula yang aman dan halal.</p><h2>Jenis Deodorant</h2><p>MBK menawarkan deodorant roll-on yang mudah diaplikasikan dan nyaman digunakan sehari-hari. Tersedia varian untuk wanita (Pink dan Purple) dan pria (Black dan Blue).</p><h2>Tips Memilih</h2><ul><li>Pilih varian sesuai gender untuk aroma yang tepat</li><li>Pastikan formulasi halal dan aman untuk kulit sensitif</li><li>Gunakan setelah mandi pada kulit yang bersih dan kering</li><li>Jangan aplikasikan langsung setelah mencukur bulu ketiak</li></ul><p>Semua produk MBK telah melalui uji keamanan dan bersertifikat halal MUI sehingga aman untuk digunakan oleh seluruh keluarga.</p>',
                'status'  => 'publish',
            ],
        ];

        foreach ($inspirations as $inspiration) {
            Inspiration::updateOrCreate(['slug' => $inspiration['slug']], $inspiration);
        }
    }
}

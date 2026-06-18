<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Deodorant Roll On', 'slug' => 'deodorant-roll-on', 'description' => 'Deodorant roll on M.B.K untuk menjaga kesegaran tubuh dan mencegah bau badan. Tersedia varian untuk wanita dan pria.'],
            ['name' => 'P.O. Powder', 'slug' => 'po-powder', 'description' => 'Bedak tabur M.B.K yang efektif menyerap keringat dan menghilangkan bau badan. Terbuat dari tawas, talc, dan parfum berkualitas.'],
            ['name' => 'Bedak Biang Keringat', 'slug' => 'bedak-biang-keringat', 'description' => 'Bedak khusus untuk mengatasi dan mencegah biang keringat. Cocok untuk segala usia.'],
            ['name' => 'Body Mist', 'slug' => 'body-mist', 'description' => 'Pewangi tubuh segar dari M.B.K untuk memberikan aroma menyenangkan sepanjang hari.'],
            ['name' => 'Body Lotion', 'slug' => 'body-lotion', 'description' => 'Lotion pelembab kulit dari M.B.K untuk menjaga kelembaban dan kesehatan kulit.'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }
    }
}

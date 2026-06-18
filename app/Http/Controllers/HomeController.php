<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Inspiration;
use App\Models\Product;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $featuredProducts = Product::query()
            ->where('featured', true)
            ->where('status', 'publish')
            ->with('category')
            ->orderBy('id')
            ->take(4)
            ->get()
            ->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'price_formatted' => 'Rp ' . number_format((float) $p->price, 0, ',', '.'),
                'image' => $p->image,
                'image_url' => $p->image ? '/storage/' . $p->image : null,
                'category_name' => $p->category?->name,
                'featured' => $p->featured,
            ]);

        $latestProducts = Product::query()
            ->where('status', 'publish')
            ->with('category')
            ->orderBy('id', 'desc')
            ->take(4)
            ->get()
            ->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'price_formatted' => 'Rp ' . number_format((float) $p->price, 0, ',', '.'),
                'image' => $p->image,
                'image_url' => $p->image ? '/storage/' . $p->image : null,
                'category_name' => $p->category?->name,
            ]);

        $categories = Category::query()
            ->withCount('products')
            ->orderBy('id')
            ->get()
            ->map(fn (Category $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description,
                'product_count' => $c->products_count,
            ]);

        $inspirations = Inspiration::query()
            ->where('status', 'publish')
            ->orderBy('id')
            ->take(3)
            ->get()
            ->map(fn (Inspiration $i) => [
                'id' => $i->id,
                'title' => $i->title,
                'slug' => $i->slug,
                'excerpt' => $i->excerpt,
                'image' => $i->image,
                'image_url' => $i->image ? '/storage/' . $i->image : null,
            ]);

        $settings = Setting::all()->keyBy('key')->map->value;

        // Build hero images array from featured products
        $heroImages = $featuredProducts->filter(fn ($p) => $p['image_url'])->pluck('image_url')->take(4)->values()->toArray();

        $stats = [
            'total_products' => Product::where('status', 'publish')->count(),
            'total_categories' => Category::count(),
            'total_inspirations' => Inspiration::where('status', 'publish')->count(),
        ];

        return Inertia::render('Home', [
            'featured_products' => $featuredProducts,
            'latest_products' => $latestProducts,
            'categories' => $categories,
            'inspirations' => $inspirations,
            'settings' => $settings,
            'stats' => $stats,
            'hero_images' => $heroImages,
        ]);
    }
}

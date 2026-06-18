<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request, ?string $categorySlug = null): Response
    {
        $query = Product::query()
            ->where('status', 'publish')
            ->with('category');

        $selectedCategory = null;
        if ($categorySlug) {
            $selectedCategory = Category::where('slug', $categorySlug)->firstOrFail();
            $query->where('category_id', $selectedCategory->id);
        }

        // Handle search
        $searchQuery = $request->input('search', '');
        if ($searchQuery) {
            $query->where(function ($q) use ($searchQuery) {
                $q->where('name', 'like', "%{$searchQuery}%")
                  ->orWhere('description', 'like', "%{$searchQuery}%");
            });
        }

        $paginated = $query->orderBy('id', 'desc')->paginate(12);

        $products = $paginated->getCollection()->map(fn (Product $p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'price' => $p->price,
            'price_formatted' => 'Rp ' . number_format((float) $p->price, 0, ',', '.'),
            'image' => $p->image,
            'image_url' => $p->image ? '/storage/' . $p->image : null,
            'shopee_link' => $p->shopee_link,
            'tokopedia_link' => $p->tokopedia_link,
            'category_name' => $p->category?->name,
            'featured' => $p->featured,
        ])->values();

        $categories = Category::query()
            ->withCount('products')
            ->orderBy('id')
            ->get()
            ->map(fn (Category $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'product_count' => $c->products_count,
            ]);

        return Inertia::render('Catalog', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $selectedCategory ? [
                'id' => $selectedCategory->id,
                'name' => $selectedCategory->name,
                'slug' => $selectedCategory->slug,
                'description' => $selectedCategory->description,
            ] : null,
            'search_query' => $searchQuery,
            'meta' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $product = Product::query()
            ->where('slug', $slug)
            ->where('status', 'publish')
            ->with('category')
            ->firstOrFail();

        $relatedProducts = Product::query()
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('status', 'publish')
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

        $settings = Setting::all()->keyBy('key')->map->value;

        return Inertia::render('ProductDetail', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'price_formatted' => 'Rp ' . number_format((float) $product->price, 0, ',', '.'),
                'image' => $product->image,
                'image_url' => $product->image ? '/storage/' . $product->image : null,
                'shopee_link' => $product->shopee_link,
                'tokopedia_link' => $product->tokopedia_link,
                'whatsapp' => $product->whatsapp,
                'featured' => $product->featured,
                'category_name' => $product->category?->name,
                'category_slug' => $product->category?->slug,
            ],
            'relatedProducts' => $relatedProducts,
            'settings' => $settings,
        ]);
    }
}

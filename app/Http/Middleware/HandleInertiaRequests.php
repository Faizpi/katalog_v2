<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'settings' => fn () => Setting::all()->keyBy('key')->map->value,
            'categories' => fn () => Category::orderBy('id')->get()->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
            ]),
            'footer_categories' => fn () => Category::withCount('products')->orderBy('id')->get()->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'product_count' => $c->products_count,
            ]),
            'chatbot_products' => fn () => Product::where('status', 'publish')->with('category')->orderBy('id')->get()->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'price_formatted' => 'Rp ' . number_format((float) $p->price, 0, ',', '.'),
                'description' => $p->description,
                'category_name' => $p->category?->name,
                'featured' => $p->featured,
            ]),
            'chatbot_categories' => fn () => Category::withCount('products')->orderBy('id')->get()->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'product_count' => $c->products_count,
            ]),
        ];
    }
}

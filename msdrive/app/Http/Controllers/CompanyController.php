<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyCollection;
use App\Http\Resources\CompanyResource;
use App\Models\User;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return new CompanyCollection($companies);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:companies|max:255',
            'owner_id' => 'required',
            'description' => 'required'
        ]);

        $company = new Company();

        $company->name = $request->name;
        $company->description = $request->description;
        $company->owner_id = $request->owner_id;

        $company->save();
    }

    public function show(Company $company)
    {
        $company_resource = new CompanyResource($company);
        return $company_resource;
    }
}

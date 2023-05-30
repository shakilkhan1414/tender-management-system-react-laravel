<?php

namespace App\Http\Controllers;
use App\Models\Tender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TenderController extends Controller
{

    public function index()
    {
        $tenders=Tender::with('submittedBy','refferedTo')->get();
        return response()->json($tenders);
    }

    public function store(Request $request)
    {
        $validatedData=$request->validate([
            'tender_name'=> 'required',
            'tender_type'=> 'required',
            'tender_price'=> 'required',
            'tender_location'=> 'required',
            'tender_description'=> 'required',
            'tender_document'=> 'required'
        ]);

        $validatedData['submission_date']=date("d-m-Y");
        $validatedData['submitted_by']=$request->submitted_by;

        if ($request->hasFile('tender_document')) {
            $file = $request->file('tender_document');
            $path = $file->store('tenders','public');
            $validatedData['tender_document']=$path;
        }

        Tender::create($validatedData);
    }

    public function show($id)
    {
        $tender=Tender::find($id)->load('submittedBy','refferedTo');
        return response()->json($tender);
    }


    public function update(Request $request, $id)
    {
        $tender=Tender::find($id);

        $data=[
            'reffered_to' => $request->reffered_to
        ];
        $tender->update($data);
    }


    public function destroy($id)
    {
        $tender=Tender::find($id);
        if (Storage::disk('public')->exists($tender->tender_document)) {
            Storage::disk('public')->delete($tender->tender_document);
        }
        $tender->delete();
    }

}

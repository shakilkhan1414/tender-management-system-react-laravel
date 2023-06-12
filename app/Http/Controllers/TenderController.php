<?php

namespace App\Http\Controllers;
use App\Models\Tender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

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
            'tender_price'=> 'required | numeric',
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
        $updateTender=Tender::find($id);

        $data=[
            'reffered_to' => $request->reffered_to
        ];
        $updateTender->update($data);

        $tender=Tender::find($id);

        $memberText='Hello '.$tender->submittedBy->name.', Your Tender \''.$tender->tender_name.'\' has been reffered to '.$tender->refferedTo->name.'.';

        $mailData = array('text'=>$memberText,'id'=>$tender->id);

        Mail::send('mail', $mailData, function($message) use ($tender){
            $message->to($tender->submittedBy->email, $tender->submittedBy->name)->subject
                ('Tender Reffered');
            $message->from('contact@shakildev.com','Tender Pro');
        });


        $memberText='A new tender \''.$tender->tender_name.'\' has been reffered to you.';

        $mailData = array('text'=>$memberText,'id'=>$tender->id);

        Mail::send('mail', $mailData, function($message) use ($tender){
            $message->to($tender->refferedTo->email, $tender->refferedTo->name)->subject
                ('New Tender Reffered');
            $message->from('contact@shakildev.com','Tender Pro');
        });

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

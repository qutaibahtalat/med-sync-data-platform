
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, MapPin } from "lucide-react";

const BookAppointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    doctorId: "",
    date: "",
    time: "",
    type: "",
    reason: "",
    notes: ""
  });

  const doctors = [
    { id: "D001", name: "Dr. Sarah Johnson", specialty: "Cardiology", available: true },
    { id: "D002", name: "Dr. Michael Chen", specialty: "Internal Medicine", available: true },
    { id: "D003", name: "Dr. Emily Rodriguez", specialty: "Endocrinology", available: false },
    { id: "D004", name: "Dr. David Wilson", specialty: "Gastroenterology", available: true }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  const appointmentTypes = [
    "Consultation", "Follow-up", "Test Results Review", 
    "Routine Check-up", "Specialist Referral"
  ];

  const handleSubmit = () => {
    console.log("Appointment booking submitted:", appointmentData);
    alert("Appointment request submitted! You will receive confirmation within 24 hours.");
  };

  const isFormValid = () => {
    return appointmentData.doctorId && appointmentData.date && 
           appointmentData.time && appointmentData.type && appointmentData.reason;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          <p className="text-gray-600">Schedule your medical appointment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Appointment Details
            </CardTitle>
            <CardDescription>Select your preferred appointment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select value={appointmentData.doctorId} onValueChange={(value) => 
                setAppointmentData({...appointmentData, doctorId: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.filter(doc => doc.available).map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={appointmentData.date}
                onChange={(e) => setAppointmentData({...appointmentData, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Preferred Time</Label>
              <Select value={appointmentData.time} onValueChange={(value) => 
                setAppointmentData({...appointmentData, time: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Appointment Type</Label>
              <Select value={appointmentData.type} onValueChange={(value) => 
                setAppointmentData({...appointmentData, type: value})
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                placeholder="Brief description of your concern"
                value={appointmentData.reason}
                onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information or special requests"
                value={appointmentData.notes}
                onChange={(e) => setAppointmentData({...appointmentData, notes: e.target.value})}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Available Doctors
            </CardTitle>
            <CardDescription>Our medical professionals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className={`p-4 border rounded-lg ${
                  appointmentData.doctorId === doctor.id 
                    ? "border-blue-500 bg-blue-50" 
                    : doctor.available 
                      ? "border-gray-200 hover:border-gray-300 cursor-pointer" 
                      : "border-gray-200 bg-gray-50 opacity-50"
                }`}
                onClick={() => doctor.available && setAppointmentData({...appointmentData, doctorId: doctor.id})}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">Main Building, 2nd Floor</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {doctor.available ? (
                      <div className="text-green-600 text-sm font-medium">Available</div>
                    ) : (
                      <div className="text-red-600 text-sm font-medium">Unavailable</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Appointment Summary */}
      {appointmentData.doctorId && appointmentData.date && appointmentData.time && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Appointment Summary
            </CardTitle>
            <CardDescription>Review your appointment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Doctor</Label>
                <p className="text-lg font-medium">
                  {doctors.find(d => d.id === appointmentData.doctorId)?.name}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Date & Time</Label>
                <p className="text-lg font-medium">
                  {appointmentData.date} at {appointmentData.time}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium">Type</Label>
                <p className="text-lg font-medium">{appointmentData.type}</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button onClick={handleSubmit} disabled={!isFormValid()}>
                Book Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookAppointment;

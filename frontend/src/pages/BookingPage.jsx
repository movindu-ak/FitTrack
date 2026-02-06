import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Check } from 'lucide-react';
import { Navigation } from '../components/Navigation';

export function BookingPage({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 20));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingType, setBookingType] = useState('workout');
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const trainers = [
    { id: '1', name: 'Sarah Johnson', specialty: 'Strength Training', rating: 4.9, image: '👩‍🦰' },
    { id: '2', name: 'Mike Chen', specialty: 'HIIT & Cardio', rating: 4.8, image: '👨' },
    { id: '3', name: 'Emily Davis', specialty: 'Yoga & Flexibility', rating: 5.0, image: '👩' },
    { id: '4', name: 'James Wilson', specialty: 'CrossFit', rating: 4.7, image: '👨‍🦱' },
  ];

  const timeSlots = [
    { time: '6:00 AM - 7:30 AM', available: 15, total: 20, crowd: 'low' },
    { time: '8:00 AM - 9:30 AM', available: 5, total: 20, crowd: 'high' },
    { time: '10:00 AM - 11:30 AM', available: 12, total: 20, crowd: 'medium' },
    { time: '12:00 PM - 1:30 PM', available: 18, total: 20, crowd: 'low' },
    { time: '2:00 PM - 3:30 PM', available: 16, total: 20, crowd: 'low' },
    { time: '4:00 PM - 5:30 PM', available: 8, total: 20, crowd: 'medium' },
    { time: '6:00 PM - 7:30 PM', available: 2, total: 20, crowd: 'high' },
    { time: '8:00 PM - 9:30 PM', available: 10, total: 20, crowd: 'medium' },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));

    return days;
  };

  const handleBooking = () => {
    alert(
      `Booking confirmed! ${
        bookingType === 'trainer'
          ? `with ${trainers.find(t => t.id === selectedTrainer)?.name}`
          : ''
      }`
    );
  };

  const days = getDaysInMonth(selectedDate);
  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen">
      <Navigation currentPage="booking" role="member" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Book Workout Slot</h1>

        {/* Booking Type */}
        <div className="inline-flex bg-neutral-800 rounded-xl p-2 mb-8">
          <button
            onClick={() => setBookingType('workout')}
            className={`px-6 py-2 rounded-lg ${
              bookingType === 'workout' ? 'bg-green-500 text-black' : 'text-neutral-400'
            }`}
          >
            Workout Slot
          </button>
          <button
            onClick={() => setBookingType('trainer')}
            className={`px-6 py-2 rounded-lg ${
              bookingType === 'trainer' ? 'bg-green-500 text-black' : 'text-neutral-400'
            }`}
          >
            Personal Trainer
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar and Time Slots */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <div className="flex justify-between mb-6">
                <h2 className="text-xl text-white">{monthName}</h2>
                <div className="space-x-2">
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                    className="text-white hover:text-green-400"
                  >
                    <ChevronLeft />
                  </button>
                  <button 
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                    className="text-white hover:text-green-400"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-neutral-400 text-sm font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) =>
                  day ? (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 rounded ${
                        day.getDate() === selectedDate.getDate()
                          ? 'bg-green-500 text-black font-semibold'
                          : 'text-white hover:bg-neutral-700'
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <div key={index} />
                  )
                )}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-neutral-800 rounded-xl p-6">
              <h2 className="text-xl text-white mb-4">Available Time Slots</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSlot(selectedSlot === slot.time ? null : slot.time)}
                    disabled={slot.available === 0}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      selectedSlot === slot.time
                        ? 'bg-green-500/20 border-green-500'
                        : slot.available === 0
                        ? 'bg-neutral-900/50 border-neutral-700 opacity-50 cursor-not-allowed'
                        : 'bg-neutral-900 border-neutral-700 hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium">{slot.time}</span>
                      </div>
                      {selectedSlot === slot.time && (
                        <Check className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`${
                        slot.crowd === 'low' ? 'text-green-400' :
                        slot.crowd === 'medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {slot.crowd === 'low' ? '🟢 Low' : 
                         slot.crowd === 'medium' ? '🟡 Medium' : 
                         '🔴 High'} crowd
                      </span>
                      <span className="text-neutral-400">
                        {slot.available}/{slot.total} spots
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trainer Selection or Summary */}
          {bookingType === 'trainer' ? (
            <div className="space-y-4">
              <div className="bg-neutral-900 rounded-xl p-6">
                <h3 className="text-lg text-white mb-4">Select Trainer</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {trainers.map((trainer) => (
                    <button
                      key={trainer.id}
                      onClick={() => setSelectedTrainer(trainer.id)}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        selectedTrainer === trainer.id
                          ? 'bg-green-500/20 border-green-500'
                          : 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{trainer.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-white font-semibold">{trainer.name}</h4>
                            {selectedTrainer === trainer.id && (
                              <Check className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <p className="text-sm text-neutral-400 mb-1">{trainer.specialty}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-white">{trainer.rating}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="bg-neutral-900 rounded-xl p-6">
                <h3 className="text-lg text-white mb-4">Booking Summary</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Type:</span>
                    <span className="text-white">Personal Trainer</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Date:</span>
                    <span className="text-white">{selectedDate.toDateString()}</span>
                  </div>
                  {selectedSlot && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Time:</span>
                      <span className="text-white">{selectedSlot}</span>
                    </div>
                  )}
                  {selectedTrainer && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Trainer:</span>
                      <span className="text-white">
                        {trainers.find(t => t.id === selectedTrainer)?.name}
                      </span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleBooking}
                  disabled={!selectedSlot || !selectedTrainer}
                  className="w-full py-3 bg-green-500 text-black rounded-lg font-semibold disabled:bg-neutral-700 disabled:text-neutral-500"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-900 rounded-xl p-6">
              <h3 className="text-lg text-white mb-4">Booking Summary</h3>

              <p className="text-neutral-400">Type: {bookingType}</p>
              <p className="text-neutral-400">Date: {selectedDate.toDateString()}</p>
              {selectedSlot && <p className="text-neutral-400">Time: {selectedSlot}</p>}

              <button
                onClick={handleBooking}
                disabled={!selectedSlot}
                className="mt-6 w-full py-3 bg-green-500 text-black rounded-lg disabled:bg-neutral-700"
              >
                Confirm Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from main_app.forms import EmailUserCreationForm, ReviewForm
from main_app.models import Subject, Review, SubjectVote


def home(request):
    subjects = Subject.objects.all()
    # return HttpResponse("This is some shit, {}".format(name))
    return render(request, "grid.html", {
        'subjects': subjects
        })


def you(request, name):
    return render(request, "grid.html", {'name': name})


def register(request):
    if request.method == 'POST':
        form = EmailUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.email_user("Welcome! Thank you for joining our sexy online community, Oyster.fm!")
            return redirect("home")
    else:
        form = EmailUserCreationForm()
    return render(request, "registration/register.html", {
        "form": form,
    })


@login_required
def profile(request):
    return render(request, "profile.html")


def subject(request, id):
    subject = Subject.objects.get(id=id)
    reviews = Review.objects.filter(subject=subject)
    subject_votes = SubjectVote.objects.filter(subject=subject)

    if request.method == "POST":
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.subject = subject
            review.author = request.user
            review.save()
            return redirect("home")
    else:
        form = ReviewForm()
    return render(request, "subject.html", {
        "form": form,
        "subject": subject,
        "subject_votes": len(subject_votes),
        "reviews": reviews,
        "reviews_count": len(reviews),
    })


using Bogus;
using FakeUserDataClient.Server.Models;

namespace FakeUserDataClient.Server.Services;

public class DataGenerator : IDataGenerator
{
    internal DataGenerator() { }
    public Faker<FakeUser> FakePersonGenerator { get; set; }
    public Faker Faker { get; set; }

    public FakeUser[] GetData(int page, int errors)
    {
        var fakeUserDataNoErrors = FakePersonGenerator.Generate(page == 1 ? 20 : 10).ToArray();

        if (errors == 0)
        {
            return fakeUserDataNoErrors;
        }

        return PutErrors(fakeUserDataNoErrors, errors);
    }

    private FakeUser[] PutErrors(FakeUser[] input, int errors)
    {
        var totalProbability = Constants.TotalProbabilityPercent;
        var errorProbabilityStep = Constants.StepErrorProbabilityInPercent;
        var errorDiscrete = Constants.ErrorDiscretes;

        var chanceOfError = errors % totalProbability;  // 125 % 100 = 25 (means probability = 0.25)
        var errorNumber = (errors - chanceOfError) / 100;

        for (int i = 0; i < input.Length; i++)
        {
            var item = input[i];
            for (int j = 0; j < errorNumber; j++)
            {
                PutOneErrorIntoItem(item);
            }

            // Code to handle error probability
            if (chanceOfError != 0)
            {
                var chance = chanceOfError / errorProbabilityStep;          // 25 / 25 = 1; 50 / 25 = 2
                var randomNumber = Faker.Random.Number(1, errorDiscrete);   //1, 2, 3, 4
                if (randomNumber <= chance) PutOneErrorIntoItem(item);
            }
        }

        return input;
    }

    private void PutOneErrorIntoItem(FakeUser item)
    {
        var userFieldForError = Faker.Random.Enum<FakeUserFieldType>();
        var errorType = Faker.Random.Enum<ErrorType>();
        switch (userFieldForError)
        {
            case FakeUserFieldType.Name:
                item.FullName = PutErrorToItemFileld(item.FullName, errorType);
                break;
            case FakeUserFieldType.Address:
                item.StreetAddress = PutErrorToItemFileld(item.StreetAddress, errorType);
                break;
            case FakeUserFieldType.Phone:
                item.Phone = PutErrorToItemFileld(item.Phone, errorType);
                break;
        }
    }

    private string PutErrorToItemFileld(string fieldText, ErrorType errorType)
    {
        var changedString = string.Empty;
        var randomIndex = Faker.Random.Int(0, fieldText.Length - 1);
        switch (errorType)
        {
            case ErrorType.DeleteChar:
                changedString = fieldText.Remove(randomIndex, 1);
                break;
            case ErrorType.InsertChar:
                var randomChar = Faker.Lorem.Letter(1);
                changedString = fieldText.Insert(randomIndex, randomChar);
                break;
            case ErrorType.SwapChar:
                var adjacentIndex = Math.Min(randomIndex, fieldText.Length - 2);
                var firstSymbol = fieldText[adjacentIndex];
                var secondSymbol = fieldText[adjacentIndex + 1];
                changedString = fieldText[..adjacentIndex] + secondSymbol +
                    firstSymbol + fieldText[(adjacentIndex + 2)..];
                break;
        }

        return changedString;
    }
}
